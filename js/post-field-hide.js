/*
 * post-field-hide.js - use this script to hide the namefield on any board
 * you probably shouldn't use this since people can unhide the CSS namefield, or disable javascript
 * instead, go to the board directory you want to disable the name field in (or any field), create a "config.php" file in that directory, and put the following in that file:
 * "<?php
 *   $config['field_disable_name'] = true;
 *   ?>"
 *
 * Created by yoot, origin from https://web.archive.org/web/20260320025339/https://gemparty.soy/
 */
	// The following is just an example. You can change /soy/ to whatever board you want.
    const isSoy = window.location.pathname.includes('/soy/') || document.title.toLowerCase().includes('soy');
    
    // Ensure this runs after DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      if (isSoy) {
        // Find either an input or a select named "name"
        const nameField = document.querySelector('input[name="name"], select[name="name"]');
        if (nameField) {
          // Try sensible container selectors (tr, div, .row) then fallback to two levels up
          const row = nameField.closest('tr, div, .row') || nameField.parentElement?.parentElement;
          if (row) {
            row.style.setProperty('display', 'none', 'important');
          } else {
            // Final fallback: hide the field itself
            nameField.style.setProperty('display', 'none', 'important');
          }
        }
      }
    });
