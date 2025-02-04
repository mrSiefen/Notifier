'use strict';

// Inject CSS styles for notifier containers if not already added.
function inject_notifier_styles() {
    if (document.getElementById('notifier-styles')) return;
    const style_elem = document.createElement('style');
    style_elem.id = 'notifier-styles';
    style_elem.type = 'text/css';
    style_elem.innerHTML = "\
.notifier-container {\
    position: fixed;\
    z-index: 1050;\
    pointer-events: none;\
}\
.notifier-top { top: 20px; }\
.notifier-bottom { bottom: 20px; }\
.notifier-left { left: 20px; }\
.notifier-right { right: 20px; }\
.notifier-middle { left: 50%; transform: translateX(-50%); }\
.notifier-container > .alert {\
    pointer-events: auto;\
    margin-bottom: 10px;\
}\
/* Override default btn-close styles for better contrast */\
.alert .btn-close {\
    background-image: none !important;\
    border: none;\
    font-size: 1.25rem;\
    line-height: 1;\
    padding: 0.5rem;\
    opacity: 0.8;\
    color: inherit;\
}\
.alert .btn-close:hover {\
    opacity: 1;\
    cursor: pointer;\
}\
@media (max-width: 576px) {\
    .notifier-container:not(.notifier-middle) {\
        left: 50% !important;\
        right: auto !important;\
        transform: translateX(-50%);\
    }\
}";
    document.head.appendChild(style_elem);
}
inject_notifier_styles();

/**
 * Notifier class
 *
 * Usage (module):
 *   import Notifier from './notifier.module.js';
 *   const notifier_instance = new Notifier({
 *       position: 'top',
 *       alignment: 'right',
 *       max_notifications: 5,
 *       default_timeout: 5000
 *   });
 *   notifier_instance.notify("Message", "success");
 */
class Notifier {
    constructor(options) {
        options = options || {};
        this.position = (options.position && options.position.toLowerCase() === 'bottom') ? 'bottom' : 'top';
        this.alignment =
            (options.alignment && ['left', 'middle', 'right'].indexOf(options.alignment.toLowerCase()) !== -1)
                ? options.alignment.toLowerCase()
                : 'right';
        this.max_notifications = options.max_notifications || 5;
        this.default_timeout = (typeof options.default_timeout === 'number') ? options.default_timeout : 5000;
        this.container_id = 'notifier-' + this.position + '-' + this.alignment;

        // Merge if an instance already exists for this container.
        if (Notifier.instances[this.container_id]) {
            const existing_instance = Notifier.instances[this.container_id];
            if (this.max_notifications > existing_instance.max_notifications) {
                existing_instance.max_notifications = this.max_notifications;
            }
            return existing_instance;
        }

        // Create the container element.
        this.container = document.createElement('div');
        this.container.id = this.container_id;
        this.container.className = 'notifier-container notifier-' + this.position + ' notifier-' + this.alignment;
        document.body.appendChild(this.container);

        // Initialize the notifications queue.
        this.notifications = [];

        // Save instance.
        Notifier.instances[this.container_id] = this;
    }

    /**
     * Adds a new notification.
     * @param {string} message - The notification message (can include HTML).
     * @param {string} [type='info'] - The Bootstrap alert type (e.g., 'success', 'info', 'warning', 'danger').
     * @param {number} [timeout] - Auto-dismiss timeout in milliseconds (-1 for no auto-dismiss).
     */
    notify(message, type, timeout) {
        type = type ? type.toLowerCase() : 'info';
        timeout = (typeof timeout === 'number') ? timeout : this.default_timeout;

        // Create the alert element using Bootstrap classes.
        const alert_elem = document.createElement('div');
        alert_elem.className = 'alert alert-' + type + ' alert-dismissible fade show';
        alert_elem.setAttribute('role', 'alert');
        alert_elem.innerHTML = message;

        // Create the close button.
        const close_btn = document.createElement('button');
        close_btn.type = 'button';
        close_btn.className = 'btn-close';
        close_btn.setAttribute('aria-label', 'Close');
        // Use a textual "×" for better contrast.
        close_btn.innerHTML = '&times;';
        close_btn.addEventListener('click', () => {
            clearTimeout(alert_elem.dismiss_timeout);
            this.removeNotification(alert_elem);
        });
        alert_elem.appendChild(close_btn);

        // Append the alert element to the notifier container.
        this.container.appendChild(alert_elem);

        // Add the new notification to the internal queue.
        this.notifications.push(alert_elem);

        // If the queue exceeds the maximum, remove the oldest notification.
        if (this.notifications.length > this.max_notifications) {
            const oldest_notification = this.notifications.shift();
            this.removeNotification(oldest_notification);
        }

        // Set up the auto-dismiss timeout if timeout is not -1.
        if (timeout !== -1) {
            alert_elem.dismiss_timeout = setTimeout(() => {
                this.removeNotification(alert_elem);
            }, timeout);
        }
    }

    /**
     * Removes a specific notification element.
     * @param {HTMLElement} notification - The notification element to remove.
     */
    removeNotification(notification) {
        if (!notification) return;
        if (notification.dismiss_timeout) {
            clearTimeout(notification.dismiss_timeout);
        }
        if (notification.parentNode === this.container) {
            this.container.removeChild(notification);
        }
        // Remove from the queue.
        this.notifications = this.notifications.filter(n => n !== notification);
    }

    /**
     * Clears all notifications from this notifier.
     */
    clearNotifications() {
        this.notifications.forEach(notification => {
            if (notification.dismiss_timeout) {
                clearTimeout(notification.dismiss_timeout);
            }
            if (notification.parentNode === this.container) {
                this.container.removeChild(notification);
            }
        });
        this.notifications = [];
    }
}

// Static property to hold instances keyed by container id.
Notifier.instances = {};

export default Notifier;
