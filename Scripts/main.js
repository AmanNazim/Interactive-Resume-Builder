var SkillsListManager = /** @class */ (function () {
  function SkillsListManager(
    inputList,
    /*getSkillInputs(): NodeListOf<HTMLInputElement>,*/ addButton,
    maxAdds
  ) {
    this.skillsInputList = inputList;
    // this.getSkillInputs() = getSkillInputs();
    this.inputAddButton = addButton;
    this.maxAdds = maxAdds;
    this.eventInitialize();
  }
  SkillsListManager.prototype.eventInitialize = function () {
    var _this = this;
    this.inputAddButton.addEventListener("click", function () {
      _this.addSkillsInputs();
    });
    this.skillsInputList.addEventListener("keydown", function (event) {
      _this.backspaceInputsRemove(event);
    });
  };
  SkillsListManager.prototype.addSkillsInputs = function () {
    //defining a new inputs variable to store and work getInputsSection gives it an id of HTMLInputElement.
    var inputs = this.getSkillInputs();
    if (inputs.length >= this.maxAdds) return;
    var newInput = document.createElement("li");
    newInput.innerHTML = '<input type="text" class="skill-inputs">';
    this.skillsInputList.insertBefore(newInput, this.inputAddButton);
    var newInputField = newInput.querySelector("input");
    newInputField.focus();
    if (inputs.length + 1 === this.maxAdds) {
      this.addButtonVisibility(false);
    }
  };
  SkillsListManager.prototype.backspaceInputsRemove = function (event) {
    var targetElement = event.target;
    if (event.key === "Backspace" && !targetElement.value) {
      var inputs = this.getSkillInputs();
      if (inputs.length > 1) {
        var parentElement = targetElement.parentElement;
        parentElement === null || parentElement === void 0
          ? void 0
          : parentElement.remove();
        if (inputs.length <= this.maxAdds) {
          this.addButtonVisibility(true);
        }
      }
    }
  };
  // Get all current skill inputs
  SkillsListManager.prototype.getSkillInputs = function () {
    return this.skillsInputList.querySelectorAll(".skill-inputs");
  };
  SkillsListManager.prototype.addButtonVisibility = function (visible) {
    this.inputAddButton.style.display = visible ? "flex" : "none";
  };
  return SkillsListManager;
})();
var skillsInputList = document.querySelector("#skills-input-list");
// const skillsInputs = document.querySelector('.skill-inputs') as NodeListOf<HTMLInputElement>;
var inputsAddButton = document.querySelector("#add-skill-inputs-button");
var maxInputsAddition = 5;
document.addEventListener("DOMContentLoaded", function () {
  var skillsListManager = new SkillsListManager(
    skillsInputList,
    /*skillsInputs,*/ inputsAddButton,
    maxInputsAddition
  );
});
