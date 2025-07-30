class PremiumCalendar {
  constructor() {
    this.currentDate = new Date();
    this.selectedDate = null;
    this.currentView = 'month';
    this.events = this.loadEvents();
    this.isDarkMode = this.loadDarkMode();
    this.editingEvent = null;
    this.searchTerm = '';

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.applyTheme();
    this.render();
    this.loadSampleEvents();
  }

  setupEventListeners() {
    // Navigation
    document.getElementById('prevBtn').addEventListener('click', () => this.navigatePrevious());
    document.getElementById('nextBtn').addEventListener('click', () => this.navigateNext());
    document.getElementById('todayBtn').addEventListener('click', () => this.goToToday());

    // View switching
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchView(e.target.closest('.view-btn').dataset.view));
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
      this.searchTerm = e.target.value;
      this.renderCurrentView();
    });

    // Theme toggle
    document.getElementById('darkModeBtn').addEventListener('click', () => this.toggleDarkMode());

    // Import/Export
    document.getElementById('exportBtn').addEventListener('click', () => this.exportEvents());
    document.getElementById('importBtn').addEventListener('click', () => this.importEvents());
    document.getElementById('importFile').addEventListener('change', (e) => this.handleFileImport(e));

    // Modal
    document.getElementById('createEventBtn').addEventListener('click', () => this.openEventModal());
    document.getElementById('closeModal').addEventListener('click', () => this.closeEventModal());
    document.getElementById('eventModal').addEventListener('click', (e) => {
      if (e.target.id === 'eventModal') this.closeEventModal();
    });

    // Event form
    document.getElementById('eventForm').addEventListener('submit', (e) => this.saveEvent(e));
    document.getElementById('deleteEventBtn').addEventListener('click', () => this.deleteEvent());
    document.getElementById('addAttendeeBtn').addEventListener('click', () => this.addAttendee());
    document.getElementById('attendeeInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.addAttendee();
      }
    });
    document.getElementById('isRecurring').addEventListener('change', (e) => {
      const recurringSelect = document.getElementById('recurringPattern');
      recurringSelect.style.display = e.target.checked ? 'block' : 'none';
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
  }

  handleKeyboardShortcuts(e) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'n':
          e.preventDefault();
          this.openEventModal();
          break;
        case 'f':
          e.preventDefault();
          document.getElementById('searchInput').focus();
          break;
        case 'd':
          e.preventDefault();
          this.toggleDarkMode();
          break;
      }
    }

    if (e.key === 'Escape') {
      this.closeEventModal();
    }
  }

  navigatePrevious() {
    const newDate = new Date(this.currentDate);
    switch (this.currentView) {
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
    }
    this.currentDate = newDate;
    this.render();
  }

  navigateNext() {
    const newDate = new Date(this.currentDate);
    switch (this.currentView) {
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
    }
    this.currentDate = newDate;
    this.render();
  }

  goToToday() {
    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.render();
  }

  switchView(view) {
    this.currentView = view;

    // Update active view button
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-view="${view}"]`).classList.add('active');

    // Show/hide views
    document.querySelectorAll('.calendar-view').forEach(view => view.classList.remove('active'));
    document.getElementById(`${view}View`).classList.add('active');

    this.render();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.saveDarkMode();
  }

  applyTheme() {
    const icon = document.querySelector('#darkModeBtn i');
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      icon.className = 'fas fa-sun';
    } else {
      document.documentElement.removeAttribute('data-theme');
      icon.className = 'fas fa-moon';
    }
  }

  render() {
    this.updateHeader();
    this.renderCurrentView();
  }

  updateHeader() {
    const monthElement = document.getElementById('currentMonth');

    switch (this.currentView) {
      case 'month':
        monthElement.textContent = this.currentDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric'
        });
        break;
      case 'week':
        const weekStart = this.getWeekStart(this.currentDate);
        monthElement.textContent = `Week of ${weekStart.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })}`;
        break;
      case 'year':
        monthElement.textContent = this.currentDate.getFullYear().toString();
        break;
      case 'agenda':
        monthElement.textContent = 'Agenda';
        break;
    }
  }

  renderCurrentView() {
    switch (this.currentView) {
      case 'month':
        this.renderMonthView();
        break;
      case 'week':
        this.renderWeekView();
        break;
      case 'agenda':
        this.renderAgendaView();
        break;
      case 'year':
        this.renderYearView();
        break;
    }
  }

  renderMonthView() {
    const container = document.getElementById('calendarDays');
    container.innerHTML = '';

    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayElement = this.createDayElement(currentDate);
      container.appendChild(dayElement);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  createDayElement(date) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';

    const isCurrentMonth = date.getMonth() === this.currentDate.getMonth();
    const isToday = this.isToday(date);
    const isSelected = this.selectedDate && this.isSameDay(date, this.selectedDate);

    if (!isCurrentMonth) dayElement.classList.add('other-month');
    if (isToday) dayElement.classList.add('today');
    if (isSelected) dayElement.classList.add('selected');

    const dayEvents = this.getEventsForDate(date);

    dayElement.innerHTML = `
            <div class="day-header">
                <span class="day-number">${date.getDate()}</span>
                ${dayEvents.length > 0 ? `
                    <div class="event-count">
                        <div class="event-dot"></div>
                        <span>${dayEvents.length}</span>
                    </div>
                ` : ''}
            </div>
            <div class="day-events">
                ${dayEvents.slice(0, 3).map(event => `
                    <div class="event-item ${event.category} ${event.priority}-priority" 
                         data-event-id="${event.id}">
                        <span class="event-title">${event.title}</span>
                        ${event.startTime ? `
                            <div class="event-time">
                                <i class="fas fa-clock"></i>
                                ${this.formatTime(event.startTime)}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
                ${dayEvents.length > 3 ? `
                    <div class="more-events">+${dayEvents.length - 3} more</div>
                ` : ''}
            </div>
        `;

    dayElement.addEventListener('click', (e) => {
      if (e.target.closest('.event-item')) {
        const eventId = e.target.closest('.event-item').dataset.eventId;
        this.openEventModal(eventId);
      } else {
        this.selectDate(date);
      }
    });

    return dayElement;
  }

  renderWeekView() {
    const weekDays = this.getWeekDays(this.currentDate);

    // Render week header
    const headerContainer = document.getElementById('weekHeader');
    headerContainer.innerHTML = `
            <div class="week-time-label"></div>
            ${weekDays.map(date => `
                <div class="week-day-header ${this.isToday(date) ? 'today' : ''}" 
                     data-date="${this.formatDate(date)}">
                    <div class="week-day-name">${date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div class="week-day-number">${date.getDate()}</div>
                </div>
            `).join('')}
        `;

    // Render week grid
    const gridContainer = document.getElementById('weekGrid');
    gridContainer.innerHTML = '';

    const timeSlots = this.generateTimeSlots();

    timeSlots.forEach(time => {
      const timeSlotElement = document.createElement('div');
      timeSlotElement.className = 'week-time-slot';

      timeSlotElement.innerHTML = `
                <div class="time-label">${this.formatTime(time)}</div>
                ${weekDays.map(date => {
        const events = this.getEventsForDateTime(date, time);
        return `
                        <div class="time-cell" data-date="${this.formatDate(date)}" data-time="${time}">
                            ${events.map(event => `
                                <div class="week-event ${event.category}" data-event-id="${event.id}">
                                    <div class="event-title">${event.title}</div>
                                    <div class="event-time">
                                        <i class="fas fa-clock"></i>
                                        ${this.formatTime(event.startTime)}
                                        ${event.endTime ? ` - ${this.formatTime(event.endTime)}` : ''}
                                    </div>
                                    ${event.location ? `
                                        <div class="event-location">
                                            <i class="fas fa-map-marker-alt"></i>
                                            ${event.location}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    `;
      }).join('')}
            `;

      gridContainer.appendChild(timeSlotElement);
    });

    // Add event listeners
    gridContainer.addEventListener('click', (e) => {
      if (e.target.closest('.week-event')) {
        const eventId = e.target.closest('.week-event').dataset.eventId;
        this.openEventModal(eventId);
      } else if (e.target.closest('.time-cell')) {
        const cell = e.target.closest('.time-cell');
        const date = new Date(cell.dataset.date);
        const time = cell.dataset.time;
        this.selectDate(date);
        this.openEventModal(null, date, time);
      }
    });
  }

  renderAgendaView() {
    const container = document.getElementById('agendaContent');
    const filteredEvents = this.getFilteredEvents();

    if (filteredEvents.length === 0) {
      container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar"></i>
                    <h3>${this.searchTerm ? 'No events found' : 'No events scheduled'}</h3>
                    <p>${this.searchTerm ? 'Try adjusting your search terms' : 'Create your first event to get started'}</p>
                </div>
            `;
      return;
    }

    const groupedEvents = this.groupEventsByDate(filteredEvents);

    container.innerHTML = Object.entries(groupedEvents).map(([date, events]) => `
            <div class="agenda-day">
                <div class="agenda-day-header">
                    <div class="agenda-date">${this.formatDateDisplay(new Date(date))}</div>
                    <div class="agenda-event-count">${events.length} event${events.length !== 1 ? 's' : ''}</div>
                </div>
                <div class="agenda-events">
                    ${events.map(event => `
                        <div class="agenda-event" data-event-id="${event.id}">
                            <div class="agenda-event-header">
                                <div class="agenda-event-title">${event.title}</div>
                                <div class="agenda-event-badges">
                                    <span class="category-badge ${event.category}">${event.category}</span>
                                    <span class="priority-badge ${event.priority}">
                                        <i class="fas fa-${this.getPriorityIcon(event.priority)}"></i>
                                        ${event.priority}
                                    </span>
                                </div>
                            </div>
                            ${event.description ? `
                                <div class="agenda-event-description">${event.description}</div>
                            ` : ''}
                            <div class="agenda-event-details">
                                ${event.startTime ? `
                                    <div class="event-detail">
                                        <i class="fas fa-clock"></i>
                                        <span>${this.formatTime(event.startTime)}${event.endTime ? ` - ${this.formatTime(event.endTime)}` : ''}</span>
                                    </div>
                                ` : ''}
                                ${event.location ? `
                                    <div class="event-detail">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <span>${event.location}</span>
                                    </div>
                                ` : ''}
                                ${event.attendees && event.attendees.length > 0 ? `
                                    <div class="event-detail">
                                        <i class="fas fa-users"></i>
                                        <span>${event.attendees.length} attendee${event.attendees.length !== 1 ? 's' : ''}</span>
                                    </div>
                                ` : ''}
                                ${event.isRecurring ? `
                                    <div class="event-detail">
                                        <i class="fas fa-repeat"></i>
                                        <span>${event.recurringPattern}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

    // Add event listeners
    container.addEventListener('click', (e) => {
      const eventElement = e.target.closest('.agenda-event');
      if (eventElement) {
        const eventId = eventElement.dataset.eventId;
        this.openEventModal(eventId);
      }
    });
  }

  renderYearView() {
    const container = document.getElementById('yearGrid');
    const year = this.currentDate.getFullYear();

    container.innerHTML = '';

    for (let month = 0; month < 12; month++) {
      const monthDate = new Date(year, month, 1);
      const monthEvents = this.getEventsForMonth(monthDate);

      const monthElement = document.createElement('div');
      monthElement.className = 'year-month';
      monthElement.innerHTML = `
                <div class="year-month-header">
                    <div class="year-month-name">${monthDate.toLocaleDateString('en-US', { month: 'long' })}</div>
                    <div class="year-month-events">${monthEvents.length} events</div>
                </div>
                <div class="mini-calendar">
                    ${['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => `
                        <div class="mini-weekday">${day}</div>
                    `).join('')}
                    ${this.generateMiniCalendarDays(monthDate).map(day => {
        if (!day) return '<div class="mini-day"></div>';

        const hasEvents = this.getEventsForDate(day).length > 0;
        const isToday = this.isToday(day);

        return `
                            <div class="mini-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}" 
                                 data-date="${this.formatDate(day)}">
                                ${day.getDate()}
                            </div>
                        `;
      }).join('')}
                </div>
            `;

      monthElement.addEventListener('click', (e) => {
        if (e.target.closest('.mini-day')) {
          const dayElement = e.target.closest('.mini-day');
          if (dayElement.dataset.date) {
            const date = new Date(dayElement.dataset.date);
            this.currentDate = date;
            this.selectedDate = date;
            this.switchView('month');
          }
        } else {
          this.currentDate = monthDate;
          this.switchView('month');
        }
      });

      container.appendChild(monthElement);
    }
  }

  // Event Management
  openEventModal(eventId = null, selectedDate = null, selectedTime = null) {
    const modal = document.getElementById('eventModal');
    const form = document.getElementById('eventForm');
    const deleteBtn = document.getElementById('deleteEventBtn');
    const modalTitle = document.getElementById('modalTitle');
    const saveButtonText = document.getElementById('saveButtonText');

    this.editingEvent = eventId ? this.events.find(e => e.id === eventId) : null;

    if (this.editingEvent) {
      modalTitle.textContent = 'Edit Event';
      saveButtonText.textContent = 'Update Event';
      deleteBtn.style.display = 'flex';
      this.populateForm(this.editingEvent);
    } else {
      modalTitle.textContent = 'Create Event';
      saveButtonText.textContent = 'Create Event';
      deleteBtn.style.display = 'none';
      form.reset();

      // Set default values
      const eventDate = selectedDate || this.selectedDate || new Date();
      document.getElementById('eventDate').value = this.formatDate(eventDate);

      if (selectedTime) {
        document.getElementById('startTime').value = selectedTime;
      }

      document.getElementById('eventCategory').value = 'other';
      document.getElementById('eventPriority').value = 'medium';
      document.getElementById('attendeesList').innerHTML = '';
    }

    modal.classList.add('active');
    document.getElementById('eventTitle').focus();
  }

  closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
    this.editingEvent = null;
  }

  populateForm(event) {
    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('startTime').value = event.startTime || '';
    document.getElementById('endTime').value = event.endTime || '';
    document.getElementById('eventCategory').value = event.category;
    document.getElementById('eventPriority').value = event.priority || 'medium';
    document.getElementById('eventLocation').value = event.location || '';
    document.getElementById('eventDescription').value = event.description || '';
    document.getElementById('isRecurring').checked = event.isRecurring || false;
    document.getElementById('recurringPattern').value = event.recurringPattern || 'weekly';
    document.getElementById('recurringPattern').style.display = event.isRecurring ? 'block' : 'none';

    // Populate attendees
    const attendeesList = document.getElementById('attendeesList');
    attendeesList.innerHTML = '';
    if (event.attendees) {
      event.attendees.forEach(attendee => {
        this.addAttendeeToList(attendee);
      });
    }
  }

  saveEvent(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const attendees = Array.from(document.querySelectorAll('.attendee-tag')).map(tag =>
      tag.textContent.replace('×', '').trim()
    );

    const eventData = {
      id: this.editingEvent ? this.editingEvent.id : Date.now().toString(),
      title: formData.get('title') || document.getElementById('eventTitle').value,
      description: document.getElementById('eventDescription').value,
      date: document.getElementById('eventDate').value,
      startTime: document.getElementById('startTime').value,
      endTime: document.getElementById('endTime').value,
      category: document.getElementById('eventCategory').value,
      priority: document.getElementById('eventPriority').value,
      location: document.getElementById('eventLocation').value,
      attendees: attendees,
      isRecurring: document.getElementById('isRecurring').checked,
      recurringPattern: document.getElementById('recurringPattern').value
    };

    if (this.editingEvent) {
      const index = this.events.findIndex(e => e.id === this.editingEvent.id);
      this.events[index] = eventData;
    } else {
      this.events.push(eventData);
    }

    this.saveEvents();
    this.closeEventModal();
    this.renderCurrentView();
  }

  deleteEvent() {
    if (this.editingEvent && confirm('Are you sure you want to delete this event?')) {
      this.events = this.events.filter(e => e.id !== this.editingEvent.id);
      this.saveEvents();
      this.closeEventModal();
      this.renderCurrentView();
    }
  }

  addAttendee() {
    const input = document.getElementById('attendeeInput');
    const email = input.value.trim();

    if (email && this.isValidEmail(email)) {
      const existingAttendees = Array.from(document.querySelectorAll('.attendee-tag')).map(tag =>
        tag.textContent.replace('×', '').trim()
      );

      if (!existingAttendees.includes(email)) {
        this.addAttendeeToList(email);
        input.value = '';
      }
    }
  }

  addAttendeeToList(email) {
    const attendeesList = document.getElementById('attendeesList');
    const attendeeTag = document.createElement('div');
    attendeeTag.className = 'attendee-tag';
    attendeeTag.innerHTML = `
            ${email}
            <button type="button" class="remove-attendee">
                <i class="fas fa-times"></i>
            </button>
        `;

    attendeeTag.querySelector('.remove-attendee').addEventListener('click', () => {
      attendeeTag.remove();
    });

    attendeesList.appendChild(attendeeTag);
  }

  // Utility Methods
  selectDate(date) {
    this.selectedDate = new Date(date);
    this.renderCurrentView();
  }

  getEventsForDate(date) {
    return this.events.filter(event => this.isSameDay(new Date(event.date), date));
  }

  getEventsForDateTime(date, time) {
    return this.events.filter(event =>
      this.isSameDay(new Date(event.date), date) &&
      event.startTime &&
      event.startTime.startsWith(time.split(':')[0])
    );
  }

  getEventsForMonth(monthDate) {
    return this.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === monthDate.getMonth() &&
        eventDate.getFullYear() === monthDate.getFullYear();
    });
  }

  getFilteredEvents() {
    let filtered = [...this.events];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(term) ||
        (event.description && event.description.toLowerCase().includes(term)) ||
        (event.location && event.location.toLowerCase().includes(term))
      );
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }
      if (a.startTime && b.startTime) {
        return a.startTime.localeCompare(b.startTime);
      }
      return 0;
    });
  }

  groupEventsByDate(events) {
    return events.reduce((groups, event) => {
      const date = event.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {});
  }

  getWeekDays(date) {
    const days = [];
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  }

  getWeekStart(date) {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    return startOfWeek;
  }

  generateTimeSlots() {
    const slots = [];
    for (let hour = 0; hour < 24; hour += 2) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  }

  generateMiniCalendarDays(monthDate) {
    const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const lastDay = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    // Add empty cells for previous month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day));
    }

    return days;
  }

  // Date utility methods
  isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }

  isToday(date) {
    return this.isSameDay(date, new Date());
  }

  formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  formatDateDisplay(date) {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(time) {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  getPriorityIcon(priority) {
    switch (priority) {
      case 'high': return 'exclamation-circle';
      case 'medium': return 'clock';
      case 'low': return 'tag';
      default: return 'tag';
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Import/Export functionality
  exportEvents() {
    const dataStr = JSON.stringify(this.events, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'calendar-events.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  importEvents() {
    document.getElementById('importFile').click();
  }

  handleFileImport(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedEvents = JSON.parse(e.target.result);
          this.events = [...this.events, ...importedEvents];
          this.saveEvents();
          this.renderCurrentView();
        } catch (error) {
          alert('Error importing events. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  }

  // Local Storage
  saveEvents() {
    localStorage.setItem('calendar-events', JSON.stringify(this.events));
  }

  loadEvents() {
    const saved = localStorage.getItem('calendar-events');
    return saved ? JSON.parse(saved) : [];
  }

  saveDarkMode() {
    localStorage.setItem('calendar-dark-mode', JSON.stringify(this.isDarkMode));
  }

  loadDarkMode() {
    const saved = localStorage.getItem('calendar-dark-mode');
    return saved ? JSON.parse(saved) : false;
  }

  // Sample data for demonstration
  loadSampleEvents() {
    if (this.events.length === 0) {
      this.events = [
        {
          id: '1',
          title: 'Team Sprint Planning',
          description: 'Weekly team sync and project updates for Q1 goals',
          date: '2025-01-15',
          startTime: '10:00',
          endTime: '11:30',
          category: 'work',
          priority: 'high',
          location: 'Conference Room A',
          attendees: ['john@company.com', 'sarah@company.com'],
          isRecurring: true,
          recurringPattern: 'weekly'
        },
        {
          id: '2',
          title: 'Gym Workout - Leg Day',
          description: 'Intense leg workout session with personal trainer',
          date: '2025-01-15',
          startTime: '18:00',
          endTime: '19:30',
          category: 'health',
          priority: 'medium',
          location: 'FitLife Gym'
        },
        {
          id: '3',
          title: 'Birthday Dinner',
          description: 'Celebrating Sarah\'s birthday at the new Italian restaurant',
          date: '2025-01-16',
          startTime: '19:00',
          endTime: '21:00',
          category: 'social',
          priority: 'high',
          location: 'Bella Vista Restaurant',
          attendees: ['sarah@email.com', 'mike@email.com', 'lisa@email.com']
        },
        {
          id: '4',
          title: 'Annual Health Checkup',
          description: 'Comprehensive health examination and blood work',
          date: '2025-01-17',
          startTime: '14:00',
          endTime: '15:30',
          category: 'health',
          priority: 'high',
          location: 'City Medical Center'
        },
        {
          id: '5',
          title: 'Project Milestone Deadline',
          description: 'Submit final project deliverables and documentation',
          date: '2025-01-20',
          startTime: '17:00',
          category: 'work',
          priority: 'high',
          location: 'Office'
        },
        {
          id: '6',
          title: 'Weekend Hiking Trip',
          description: 'Mountain hiking adventure with photography club',
          date: '2025-01-18',
          startTime: '08:00',
          endTime: '16:00',
          category: 'personal',
          priority: 'medium',
          location: 'Blue Ridge Mountains',
          attendees: ['alex@photo.com', 'emma@photo.com']
        }
      ];
      this.saveEvents();
    }
  }
}

// Initialize the calendar when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PremiumCalendar();
});
