neo.undoManager.setup({
    getSnapshot : createPatch,
    setSnapshot : applyPatch
});

var firstSnapshot = '';
var isFirstSnapshot = true;

function createPatch() {
    var snapshot = '';
    
    if (isFirstSnapshot) {
        firstSnapshot = $('#text').val();
        
        snapshot = $('#text').val();

        isFirstSnapshot = false;
    } else {
        snapshot = JsDiff.createPatch('', firstSnapshot, $('#text').val());
    }
    
    return snapshot;
}

function applyPatch(patch) {
    var text = JsDiff.applyPatch(firstSnapshot, patch);

    $('#text').val(text);
}