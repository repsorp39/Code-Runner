class DOM_Methods{
    static makeTabulation(e) {
        e.preventDefault();
        this.insertText("    ");
      }

    static pastingPrevent(e) {
        e.preventDefault();
        const text = e.clipboardData?.getData("text") ?? "";
        this.insertText(text);
      }

    static closeAllTags(e) {
        if (e.key === "{") {
          e.preventDefault();
          this.insertTextAfterCursor("{}");
        } else if (e.key === "(") {
          e.preventDefault();
          this.insertTextAfterCursor("()");
        } else if (e.key === "[") {
          e.preventDefault();
          this.insertTextAfterCursor("[]");
        } else if (e.key === "'") {
          e.preventDefault();
          this.insertTextAfterCursor("''");
        } else if (e.key === '"') {
          e.preventDefault();
          this.insertTextAfterCursor('""');
        } else if (e.key === "`") {
          e.preventDefault();
          this.insertTextAfterCursor("``");
        }
      }

    static getCursorPosition(editor, range) {
        const preCursorRange = document.createRange();
        preCursorRange.setStart(editor, 0);
        preCursorRange.setEnd(range.startContainer, range.startOffset);
        return preCursorRange.toString().length;
    }

    static insertTextAfterCursor(text) {
        const selection = window.getSelection();
        
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let textNode = document.createTextNode(text); 
        
            range.collapse(true); // Déplacer le curseur à la fin du range
            range.insertNode(textNode);
        
            // Déplacer le curseur après le texte inséré
            const newRange = document.createRange();
            newRange.setStart(textNode, text.length - 1);
            newRange.collapse(true); 
            selection.removeAllRanges(); 
            selection.addRange(newRange);
        }
      }
      
    static restoreCursorPosition(editor, position) {
        const newRange = document.createRange();
        const prevRange = this.getTextNodeAtPosition(editor, position);
        
            try {
            if(prevRange.node){
                newRange.setStart(prevRange.node, prevRange.pos);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(newRange);
                newRange.collapse(true);
        
            };
            } catch (error) {
              //console.log(error);
            }
        }
      
    static getTextNodeAtPosition(editor, position, offset=0) {
        let nodes = this.getAllChildsNodes(editor); 
        
        for(const node of nodes){
            if(node.nodeType === Node.TEXT_NODE) {
                const length = node.nodeValue.length;
                if (offset + length >= position) {
                    return { node,pos:length - Math.abs(position-(offset+length))};
                }else{
                    
                }
                offset += length;
            }
        }
        }
          
        static getAllChildsNodes(node, childs=[]){
            const nodes = Array.from(node.childNodes);
            for(const n of nodes){
                if(n.nodeType === Node.TEXT_NODE) childs.push(n);
                else this.getAllChildsNodes(n,childs);
            }
        
            return childs;
        }

        static insertText(text) {
            document.execCommand("insertText", false, text);
            }
          
}

export default DOM_Methods;

