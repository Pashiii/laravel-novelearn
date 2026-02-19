
export const shortcutsData = {
    word: [
      {
        title: "Document Shortcuts",
        items: [
          { key: "Home", desc: "Go to the start of line", img: "/ms/home.gif" },
          { key: "CTRL + Home", desc: "Go to the start of document", img: "/ms/ctrl-home.gif" },
          { key: "Page Down", desc: "Go to next page", img: "/ms/pagedown.gif" },
          { key: "CTRL + Page Down", desc: "Go to next page(top)", img: "/ms/ctrl-pagedown.gif" },
          { key: "CTRL + F", desc: "Find (Navigation Pane)", img: "/ms/ctrl-f.gif" },
          { key: "Tab", desc: "Go to next table cell", img: "/ms/tab.gif" },
          { key: "End", desc: "Go to end of line", img: "/ms/end.gif" },
          { key: "CTRL + End", desc: "Go to end of document", img: "/ms/ctrl-end.gif" },
          { key: "Page Up", desc: "Go to previous page", img: "/ms/pageup.gif" },
          { key: "CTRL + Page Up", desc: "Go to previous page(top)", img: "/ms/ctrl-pageup.gif" },


        ],
      },
      {
        title: "Document Shortcuts",
        items: [
            { key: 'CTRL + N', desc: 'Copy New Document', img: 'ms/ctrl-n.gif' },
            { key: 'CTRL + S', desc: 'Save the Document', img: 'ms/ctrl-s.gif' },
            { key: 'CTRL + Z', desc: 'Undo last Action', img: 'ms/ctrl-z.gif' },
            { key: 'CTRL + A', desc: 'Select All', img: 'ms/ctrl-a.gif' },
            { key: 'F7', desc: 'Spelling & Grammar', img: 'ms/f7.gif' },
            { key: 'CTRL + F4', desc: 'Close Document', img: 'ms/ctrl-f4.gif' },
            { key: 'CTRL + P', desc: 'Print', img: 'ms/ctrl-p.gif' },
            { key: 'CTRL + Y', desc: 'Redo', img: 'ms/ctrl-y.gif' },
            { key: 'F4', desc: 'Repeat Action', img: 'ms/f4.gif' },
            { key: 'F9', desc: 'Refresh Fields', img: 'ms/f9.gif' },
            {
                key: 'CTRL + ALT + T',
                desc: 'Go to a specific Page',
                img: 'ms/ctrl-alt-t.gif',
            },
            {
                key: 'CTRL + ALT + C',
                desc: 'Go to previous table cell',
                img: 'ms/ctrl-alt-c.gif',
            },
        ]
      },
      {
        title: "Clipboard Shortcuts",
        items: [
          { key: "CTRL + X", desc: "Cut", img: "/ms/ctrl-x.gif" },
          { key: "CTRL + V", desc: "Paste", img: "/ms/ctrl-v.gif" },
          { key: "CTRL + Alt + V", desc: "Paste Special", img: "/ms/ctrl-alt-v.gif" },
        ],
      },
      {
        title: "Paragraph and Pagination Shortcuts",
        items: [
          { key: "Enter", desc: "New Paragraph", img: "/ms/enter.gif" },
          { key: "CTRL + Enter", desc: "Page Break", img: "/ms/ctrl-enter.gif" },
          { key: "Shift + Enter", desc: "Line Break", img: "/ms/shift-enter.gif" },
          { key: "CTRL + Shift + Enter", desc: "Paste Special", img: "/ms/ctrl-shift-enter.gif" },
          { key: "CTRL + Q", desc: "Paste ", img: "/ms/ctrl-q.gif" },
          { key: "CTRL + M", desc: "Paste ", img: "/ms/ctrl-m.gif" },
          { key: "CTRL + Shift + M", desc: "Paste ", img: "/ms/ctrl-shift-m.gif" },
          { key: "CTRL + E", desc: "Paste ", img: "/ms/ctrl-e.gif" },
        ],
      },
    ],
  
    excel: [
      {
        title: "Clipboard Shortcuts",
        items: [
          { key: "CTRL + N", desc: "Create a new workbook.", img: "/excel/ctrl-n.gif" },
          { key: "CTRL + O", desc: "Open an existing workbook", img: "/excel/ctrl-o.gif" },
          { key: "CTRL + W", desc: "Close the active workbook", img: "/excel/ctrl-w.gif" },
          { key: "CTRL + C", desc: "Copy the contents of the selected cells to Clipboard", img: "/excel/ctrl-c.gif" },
          { key: "CTRL + X", desc: "Cut the contents of the selected cells to Clipboard", img: "/excel/ctrl-x.gif" },
          { key: "CTRL + V", desc: "Insert the contents of the Clipboard into the selected cell(s)", img: "/excel/ctrl-v.gif" },
          { key: "CTRL + Z", desc: "Undo your last action", img: "/excel/ctrl-z.gif" },
          { key: "CTRL + P", desc: "Open the \"Print\" dialog.", img: "/excel/ctrl-p.gif" },

        ],
      },
      {
        title: "Formatting Data",
        items: [
          { key: "CTRL + 1", desc: "Open the \"Format Cells\" dialog.", img: "/excel/ctrl-1.gif" },
          { key: "CTRL + T", desc: "Convert selected cells to a table. You can also select any cell in a range of related data, and pressing Ctrl + T will make it a table.t", img: "/excel/ctrl-t.gif" },
        ],
      },
      {
        title: "Navigating and Viewing data",
        items: [
            { key: "CTRL + F1", desc: "Show / hide the Excel Ribbon. Hide the ribbon to view more than 4 rows of data.", img: "/excel/ctrl-f1.gif"},
            { key: "CTRL + Tab", desc: "Switch to the next worksheet. Press Ctrl + PgUp to switch to the previous sheet.", img: "/excel/ctrl-tab.gif"},
            { key: "CTRL + Page Down", desc: "Go to previous page", img: "/excel/ctrl-pagedown.gif"},
            { key: "CTRL + G", desc: "Open the \"Go to\" dialog. Pressing F5 displays the same dialog.", img: "/excel/ctrl-g.gif"},
            { key: "CTRL + F", desc: "Display the \"Find\" dialog box.", img: "/excel/ctrl-f.gif"},
            { key: "Home", desc: "Return to the 1st cell of the current row in a worksheet.", img: "/excel/home.gif"},
            { key: "CTRL + Home", desc: "Move to the beginning of a worksheet (A1 cell).", img: "/excel/ctrl-home.gif"},
            { key: "CTRL + End", desc: "Move to the last used cell of the current worksheet, i.e. the lowest row of the rightmost column.", img: "/excel/CTRL+F!.gif"},

        ]
      },
      {
        title: "Entering Data",
        items: [
          { key: "F2", desc: "Edit current cell", img: "/excel/f2.gif" },
          { key: "ALT + Enter", desc: "In cell editing mode, enter a new line (carriage return) into a cell.", img: "/excel/alt-enter.png" },
          { key: "CTRL + ;", desc: "Enter the current date. Press Ctrl + Shift + ; to enter the current time.", img: "/excel/ctrl-;.png" },
          { key: "CTRL + Enter", desc: "	Fill the selected cells with the contents of the current cell. \nExample: select several cells. Press and hold down Ctrl, click on any cell within selection and press F2 to edit it. Then hit Ctrl + Enter and the contents of the edited cell will be copied into all selected cells.", img: "/excel/ctrl-enter.png" },
          { key: "CTRL + D", desc: "Copy the contents and format of the first cell in the selected range into the cells below. If more than one column is selected, the contents of the topmost cell in each column will be copied downwards.", img: "/excel/ctrl-d.gif" },
          { key: "CTRL + Shift + V", desc: "Open the \"Paste Specialn\" dialog when clipboard is not empty.", img: "/excel/ctrl-shift-v.gif" },

          { key: "CTRL + Y", desc: "Repeat / Redo the last action, if possible.", img: "/excel/ctrl-y.gif" },

        ],
      },
      {
        title: "Selecting data",
        items: [
            { key: "Ctrl + A", desc: "Select the entire worksheet. If the cursor is currently placed within a table, press once to select the table, press one more time to select the whole worksheet.", img: "/excel/ctrl-a.gif" },
            { key: "Ctrl + Space", desc: "Select the entire column.", img: "/excel/ctrl-space.gif" },
            { key: "Shift + Space", desc: "Select the entire row.", img: "/excel/shift-space.gif" },
        ]
      },
    ],
  };
  
