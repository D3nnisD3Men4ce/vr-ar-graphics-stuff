// FootBindingController.js
// Version: 0.0.1
// Event: Lens Initialized
// Description: Controller for each of inividual foot bindings

// @input int type = 0 {"widget":"combobox", "values":[{"label":"Left", "value":0}, {"label":"Right", "value":1}]}

var rComp = new global.MathLib.vec3(0, Math.PI * 0.5, Math.PI * -0.65);
var lComp = new global.MathLib.vec3(0, Math.PI * -0.5, Math.PI * -0.35);
var comp = script.type == 0 ? lComp : rComp;
var FIXED_ML_ROTATION = global.MathLib.quat.fromEulerVec(comp);

var binding = null;

var FootBinding = function(fixRot) {
    this.inObjectPoints = null;

    this.binding = null;
    this.bindingTF = null;

    this.trackedMeshVisuals = null;
    
    this.isVisible = null;
    this.fixRot = fixRot;
};


FootBinding.prototype = {
    setObject: function(object) {
        this.binding = object;
        this.bindingTF = this.binding.getTransform();
    },

    setTransform: function(transform) {
        // Rotate
        var trueRot = global.MathLib.rodriguesToQuat(new global.MathLib.vec3(-transform[1], -transform[0], -transform[2]));
        trueRot = trueRot.multiply(this.fixRot);

        this.bindingTF.setWorldRotation(global.MathLib.quat.toEngine(trueRot));

        // Translate
        var center = new vec3(-transform[4], -transform[3], -transform[5]);
        this.bindingTF.setWorldPosition(center);
    },

    setEnabled: function(value) {
        var child = this.binding.getChild(0);
        if (child) {
            child.enabled = value;
        }
        this.isVisible = value;
    }
};


function createBinding(points) {
    binding = new FootBinding(FIXED_ML_ROTATION);
    binding.setObject(script.getSceneObject());

    binding.inObjectPoints = new Float32Array(points.length);
    binding.inObjectPoints.set(points);

    if (script.type) {
        binding.inObjectPoints = global.MathLib.reflectX(binding.inObjectPoints);
    }

    return binding;
}

function getBinding() {
    return binding;
}



script.api.createBinding = createBinding;
script.api.getBinding = getBinding;
