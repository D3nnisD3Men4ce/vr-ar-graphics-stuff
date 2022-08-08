// @input Component.ScriptComponent footBindingLeft
// @input Component.ScriptComponent footBindingRight
// @input SceneObject hintObject


var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);

if (!script.footBindingLeft) {
    print("Please set Foot Binding Left Script");
}

if (!script.footBindingRight) {
    print("Please set Foot Binding Right Script");
}

function onUpdate() {
    var leftVisible = false;
    var rightVisible = false;
    
    var leftBinding = null;
    var rightBinding = null;
    
    if (script.footBindingLeft.api && script.footBindingLeft.api.getBinding) {
        leftBinding = script.footBindingLeft.api.getBinding(); 
        if (leftBinding && leftBinding.isVisible) {
            leftVisible = true;
        }
    }
    
    if (script.footBindingRight.api && script.footBindingRight.api.getBinding) {
        rightBinding = script.footBindingRight.api.getBinding(); 
        if (rightBinding && rightBinding.isVisible) {
            rightVisible = true;
        }
    }
    
    if (leftVisible) {
        global.behaviorSystem.sendCustomTrigger("LEFT_FOOT_FOUND");
        global.tweenManager.startTween(script.hintObject, "hide_hint");
    }
    
    if (rightVisible) {
        global.behaviorSystem.sendCustomTrigger("RIGHT_FOOT_FOUND");
        global.tweenManager.startTween(script.hintObject, "hide_hint");
    }
    
    if (leftVisible && rightVisible) {
        updateEvent.enabled = false;
    }
}