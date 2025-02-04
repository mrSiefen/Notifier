# Notifier Helper Class

**Notifier Helper Class** is a lightweight JavaScript helper that makes it easy to display Bootstrap notifications on your web pages. It supports both module and non-module usage, allows for flexible configuration, and integrates seamlessly with Bootswatch themes and dark/light mode toggling.

**Demo:** [Master Demo](https://mrsiefen.github.io/Notifier/index.html)

## Features

- **Simple API:**  
  Create notifier instances by specifying parameters such as position (`top` or `bottom`), alignment (`left`, `middle`, or `right`), maximum notifications, and auto-dismiss timeout (or no timeout with `-1`).

- **Singleton per Container:**  
  Multiple instantiations for the same screen area merge into a single notifier with a shared notification queue.

- **Auto‑Dismiss & Manual Close:**  
  Notifications automatically dismiss after a configurable timeout unless specified to remain until closed manually.

- **Responsive Design:**  
  The notification container adjusts its positioning to MIDDLE for smaller screens.

- **Module & Non‑Module Support:**  
  Use the helper as a global script (non‑module) or import it as an ES module.

## Files

- **notifier.js**  
  Non‑module version for global usage. Simply include it with a `<script>` tag, and it attaches `Notifier` to the global object.

- **notifier.module.js**  
  ES module version that exports the Notifier class as the default export for module-based projects.

- **index.html**  
  A master demo page that combines examples, documentation, and custom configuration. This page lets users experiment with every feature of the Notifier class.

- **example_validation.html**  
  A demo page that showcases how to use the Notifier class for form validation. NON-MODULE VERSION.

- **example_validation.module.html**  
  A demo page that showcases how to use the Notifier class for form validation. MODULE VERSION.

- **crazy_example.html**  
  A demo page that showcases spawning notifications in all containers at once. NON-MODULE VERSION.

## Installation

Clone or download the repository, then include the desired version of the notifier in your project:

### For Non‑Module (Global) Usage:
Include the file in your HTML:
```html
<script src="notifier.js"></script>
```
Then, create a notifier instance as shown below.

### For ES Module Usage:
Import the module in your JavaScript:
```javascript
import Notifier from './notifier.module.js';
```

## Usage Example

Create a basic notifier instance and display a notification:
```javascript
// Create a notifier instance (global usage)
var notifier_instance = new Notifier({
  position: 'top',        // 'top' or 'bottom'
  alignment: 'right',     // 'left', 'middle', or 'right'
  max_notifications: 5,   // Maximum number of notifications allowed at once
  default_timeout: 5000   // Auto-dismiss timeout in milliseconds (-1 for no auto-dismiss)
});

// Display a success notification
notifier_instance.notify("Hello, world!", "success");
```

## Custom Configuration

In the master demo (index.html), you can dynamically create a custom notifier by selecting parameters such as position, alignment, maximum notifications, and timeout. Then test the custom configuration with a sample notification.

## Theme Support

The project integrates with Bootswatch 5 themes. In the master demo, a dropdown is populated with themes from the [Bootswatch API](https://bootswatch.com/api/5.json). You can change the theme on the fly, and also toggle between light and dark modes using the Bootstrap `data-bs-theme` attribute.

## Examples

- **Master Demo:**  
  [index.html](https://mrsiefen.github.io/Notifier/) – Combines spawner, interactive documentation, and custom configuration examples with theme support.

- **Form Validation:**  
  - [example_validation.html](https://mrsiefen.github.io/Notifier/example_validation.html) – Demonstrates how to use the Notifier class for form validation. NON-MODULE VERSION.
  - [example_validation.module.html](https://mrsiefen.github.io/Notifier/example_validation_module.html) – Demonstrates how to use the Notifier class for form validation. MODULE VERSION.

- **Crazy Example:**  
  [crazy_example.html](https://mrsiefen.github.io/Notifier/crazy_example.html) – Spawns notifications in all containers at once. NON-MODULE VERSION.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. If you have any issues or feature requests, feel free to open an issue.

## Contact

For questions or suggestions, please open an issue or contact the project maintainer.

---

Enjoy using the Notifier Helper Class to create clean, responsive notifications for your Bootstrap projects!