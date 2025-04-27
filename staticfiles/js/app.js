document.addEventListener('DOMContentLoaded', () => {
    const docArea = document.querySelector('.document-area');
    const undoBtn = document.querySelector('[aria-label="Undo"]');
    const redoBtn = document.querySelector('[aria-label="Redo"]');
    const boldBtn = document.querySelector('[aria-label="Bold"]');
    const italicBtn = document.querySelector('[aria-label="Italic"]');
    const underlineBtn = document.querySelector('[aria-label="Underline"]');
    // const textColorBtn = document.querySelector('[aria-label="Text color"]');
    // const colorPicker = document.createElement('input');
    // const highlightColorBtn = document.querySelector('[aria-label="Highlight color"]');
    const insertImageInput = document.querySelector('input[aria-label="Insert image"]');
    const alignLeftBtn = document.querySelector('[aria-label="Align left"]');
    const alignCenterBtn = document.querySelector('[aria-label="Align center"]');
    const alignRightBtn = document.querySelector('[aria-label="Align right"]');
    const justifyBtn = document.querySelector('[aria-label="Justify"]');
    const numberedListBtn = document.querySelector('[aria-label="Numbered list"]');
    const bulletedListBtn = document.querySelector('[aria-label="Bulleted list"]');
    const fontSizeIncreaseBtn = document.querySelector('[aria-label="Increase font size"]');
    const fontSizeDecreaseBtn = document.querySelector('[aria-label="Decrease font size"]');
    const textStyleSelect = document.querySelector('select[aria-label="Text style"]');
    const undoStack = [];
    const redoStack = [];

    // Store history for undo/redo
    function storeHistory() {
        undoStack.push(docArea.innerHTML);
        redoStack.length = 0; // Clear redo stack on new change
        undoBtn.disabled = false;
        redoBtn.disabled = true;
    }

    function undoAction() {
        if (undoStack.length > 0) {
            redoStack.push(docArea.innerHTML);
            const lastState = undoStack.pop();
            docArea.innerHTML = lastState;
            undoBtn.disabled = undoStack.length === 0;
            redoBtn.disabled = false;
        }
    }

    function redoAction() {
        if (redoStack.length > 0) {
            const nextState = redoStack.pop();
            docArea.innerHTML = nextState;
            undoStack.push(docArea.innerHTML);
            undoBtn.disabled = false;
            redoBtn.disabled = redoStack.length === 0;
        }
    }


    // Bold text
    boldBtn.addEventListener('click', () => {
        document.execCommand('bold', false, null);
        storeHistory();
    });

    // Italic text
    italicBtn.addEventListener('click', () => {
        document.execCommand('italic', false, null);
        storeHistory();
    });

    // Underline text
    underlineBtn.addEventListener('click', () => {
        document.execCommand('underline', false, null);
        storeHistory();
    });

    // Change text color
    function initializeTextColorPicker() {
        const textColorBtn = document.querySelector('[aria-label="Text color"]');
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.style.display = 'none'; // Initially hidden

        // Append the color picker to the document
        document.body.appendChild(colorPicker);

        // Show color picker when the text color button is clicked
        textColorBtn.addEventListener('click', () => {
            colorPicker.click();
        });

        // When the color is selected from the color picker
        colorPicker.addEventListener('input', () => {
            const color = colorPicker.value;
            document.execCommand('foreColor', false, color);
            storeHistory();
        });
    }

    // Call the function to initialize the color picker
    initializeTextColorPicker();


    function initializeHighlightColorPicker() {
        const highlightColorBtn = document.querySelector('[aria-label="Highlight color"]');
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.style.display = 'none'; // Initially hidden

        // Append the color picker to the document
        document.body.appendChild(colorPicker);

        // Show color picker when the highlight color button is clicked
        highlightColorBtn.addEventListener('click', () => {
            colorPicker.click();
        });

        // When the color is selected from the color picker
        colorPicker.addEventListener('input', () => {
            const color = colorPicker.value;
            document.execCommand('backColor', false, color);
            storeHistory();
        });
    }

    // Call the function to initialize the highlight color picker
    initializeHighlightColorPicker();


    insertImageInput.addEventListener('change', () => {
        const file = insertImageInput.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;

                // Focus the editable area before inserting
                docArea.focus();

                // Create the image element dynamically
                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.width = '150px'; // Set fixed width
                img.style.height = '150px'; // Set fixed height
                img.style.borderRadius = '50%'; // Make the image circular
                img.style.position = 'absolute'; // Absolute positioning inside the container
                img.style.top = '50px'; // 50px margin from top
                img.style.right = '50px'; // 50px margin from right
                img.style.border = '1px solid grey';

                // Append the image to the document area
                docArea.appendChild(img);

                // Store history after inserting image
                storeHistory();
            };
            reader.readAsDataURL(file);
        }

        // Clear the input value so the same file can be re-uploaded
        insertImageInput.value = '';
    });


    // Text alignment
    alignLeftBtn.addEventListener('click', () => {
        document.execCommand('justifyLeft', false, null);
        storeHistory();
    });

    alignCenterBtn.addEventListener('click', () => {
        document.execCommand('justifyCenter', false, null);
        storeHistory();
    });

    alignRightBtn.addEventListener('click', () => {
        document.execCommand('justifyRight', false, null);
        storeHistory();
    });

    justifyBtn.addEventListener('click', () => {
        document.execCommand('justifyFull', false, null);
        storeHistory();
    });

    // Numbered list
    numberedListBtn.addEventListener('click', () => {
        document.execCommand('insertOrderedList', false, null);
        storeHistory();
    });

    // Bulleted list
    bulletedListBtn.addEventListener('click', () => {
        document.execCommand('insertUnorderedList', false, null);
        storeHistory();
    });

    // Increase font size
    fontSizeIncreaseBtn.addEventListener('click', () => {
        const currentSize = window.getComputedStyle(docArea).fontSize;
        docArea.style.fontSize = (parseInt(currentSize) + 2) + 'px';
        storeHistory();
    });

    // Decrease font size
    fontSizeDecreaseBtn.addEventListener('click', () => {
        const currentSize = window.getComputedStyle(docArea).fontSize;
        docArea.style.fontSize = (parseInt(currentSize) - 2) + 'px';
        storeHistory();
    });

    // Add initial document content and store history
    docArea.addEventListener('input', storeHistory);
    storeHistory();

    // Attach undo/redo buttons
    undoBtn.addEventListener('click', undoAction);
    redoBtn.addEventListener('click', redoAction);



    textStyleSelect.addEventListener('change', () => {
        const selectedStyle = textStyleSelect.value;
        const selection = window.getSelection();

        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        if (range.collapsed) return; // kuch select nahi hua

        const span = document.createElement('span');

        switch (selectedStyle) {
            case 'Normal text':
                span.style.fontWeight = 'normal';
                span.style.fontSize = '16px';
                span.style.fontFamily = 'Arial, sans-serif';
                break;
            case 'Title':
                span.style.fontWeight = 'bold';
                span.style.fontSize = '32px';
                span.style.fontFamily = 'Arial, sans-serif';
                break;
            case 'Subtitle':
                span.style.fontWeight = 'bold';
                span.style.fontSize = '24px';
                span.style.fontFamily = 'Arial, sans-serif';
                break;
            case 'Heading 1':
                span.style.fontWeight = 'bold';
                span.style.fontSize = '36px';
                span.style.fontFamily = 'Arial, sans-serif';
                break;
            case 'Heading 2':
                span.style.fontWeight = 'bold';
                span.style.fontSize = '30px';
                span.style.fontFamily = 'Arial, sans-serif';
                break;
            case 'Heading 3':
                span.style.fontWeight = 'bold';
                span.style.fontSize = '24px';
                span.style.fontFamily = 'Arial, sans-serif';
                break;
        }

        span.textContent = selection.toString(); // selected text ko span ke andar daal diya

        range.deleteContents(); // pehle select hua text hatao
        range.insertNode(span); // fir span insert karo

        selection.removeAllRanges(); // selection clear
    });



    document.querySelector('[aria-label="Zoom"]').addEventListener('change', function () {
        const zoomLevel = this.value;

        // Set the zoom level based on the selected option
        document.querySelector('.document-area').style.zoom = zoomLevel;
    });


    const fontSelect = document.querySelector('select[aria-label="Font"]');
    fontSelect.addEventListener('change', (e) => {
        const selectedFont = e.target.value;
        document.execCommand('fontName', false, selectedFont);
    });


    const decreaseIndentBtn = document.querySelector('button[aria-label="Decrease indent"]');
    const increaseIndentBtn = document.querySelector('button[aria-label="Increase indent"]');

    decreaseIndentBtn.addEventListener('click', () => {
        document.execCommand('outdent');
    });

    increaseIndentBtn.addEventListener('click', () => {
        document.execCommand('indent');
    });


});
