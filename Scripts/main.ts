class SkillsListManager {
    private skillsInputList: HTMLOListElement;
    // private getSkillInputs(): NodeListOf<HTMLInputElement>;
    private inputAddButton: HTMLButtonElement;
    private maxAdds: number;

    constructor (inputList: HTMLOListElement, /*getSkillInputs(): NodeListOf<HTMLInputElement>,*/ addButton: HTMLButtonElement, maxAdds:number) {
        this.skillsInputList = inputList;
        // this.getSkillInputs() = getSkillInputs();
        this.inputAddButton = addButton;
        this.maxAdds = maxAdds;

        this.eventInitialize();
    }

    private eventInitialize(): void {
        this.inputAddButton.addEventListener('click', () => {this.addSkillsInputs()});
        this.skillsInputList.addEventListener('keydown', (event) => {this.backspaceInputsRemove(event);});
    }

    private addSkillsInputs(): void {
        //defining a new inputs variable to store and work getInputsSection gives it an id of HTMLInputElement. 
        const inputs = this.getSkillInputs();

        if (inputs.length >= this.maxAdds) return;

        const newInput = document.createElement('li');
        newInput.innerHTML = '<input type="text" class="skill-inputs">';

        this.skillsInputList.insertBefore(newInput, this.inputAddButton);

        const newInputField = newInput.querySelector('input') as HTMLInputElement;
        newInputField.focus();

        if (inputs.length + 1 === this.maxAdds) {
                this.addButtonVisibility(false);
        }
    }

    private backspaceInputsRemove(event: KeyboardEvent): void {
        const targetElement = event.target as HTMLInputElement;

        if (event.key === 'Backspace' && !targetElement.value) {
            const inputs = this.getSkillInputs();
            
            if (inputs.length > 1) {
                const parentElement = targetElement.parentElement as HTMLLIElement;
                parentElement?.remove();

                if (inputs.length <= this.maxAdds) {
                    this.addButtonVisibility(true);
                }
            }
        }
    }

    // Get all current skill inputs
    private getSkillInputs(): NodeListOf<HTMLInputElement> {
      return this.skillsInputList.querySelectorAll('.skill-inputs');
    }

    private addButtonVisibility(visible: boolean): void {
        this.inputAddButton.style.display = visible ? 'flex' : 'none';
    }
}

const skillsInputList = document.querySelector('#skills-input-list') as HTMLOListElement ;
// const skillsInputs = document.querySelector('.skill-inputs') as NodeListOf<HTMLInputElement>;
const inputsAddButton = document.querySelector('#add-skill-inputs-button') as HTMLButtonElement;
const maxInputsAddition:number = 5; 

document.addEventListener('DOMContentLoaded', () => {
    const skillsListManager = new SkillsListManager(skillsInputList, /*skillsInputs,*/ inputsAddButton, maxInputsAddition);
})
