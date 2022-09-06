
// reference source: https://stackoverflow.com/questions/62789734/drag-and-drop-using-javascript-and-html

/* allowDrop(ev)

Description: Implements the ability to drag and drop a task in the product backlog
when certain criteria are met.

Arguments: 
    ev: Boolean variable either true or false resulting from an event happening in HTML

Returns: This function has no returns */


function allowDrop(ev) {
    ev.preventDefault();
    }
    function drag(ev) {
        // Text plain refers to the data type (DOMString) of the object being dragged
        // ev.target.id is the id of the object being dragged
        ev.dataTransfer.setData("text/plain", ev.target.id);

    }
    function drop(ev) {
        ev.preventDefault();
        let sourceId = ev.dataTransfer.getData("text/plain");
        let sourceIdEl = document.getElementById(sourceId);
        let sourceIdParentEl = sourceIdEl.parentElement;
        let targetEl = document.getElementById(ev.target.id);
        let targetParentEl = targetEl.parentElement;

        if (targetParentEl.id !== sourceIdParentEl.id) {
            if (targetEl.className === sourceIdEl.className) {
                targetParentEl.appendChild(sourceIdEl);

            } else {
                targetEl.appendChild(sourceIdEl)
            }
        } else {
            let holder = targetEl;
            let holderText = holder.textContent;
            targetEl.textContent = sourceIdEl.textContent;
            sourceIdEl.textContent = holderText;
            holderText = ''
        }
    }

    