declare function showProfilePopup(): void;
declare function updateProfile(name: string, image: string): void;
declare function initializeProfile(): void;
declare function closeProfilePopup(): void;
declare class ListsManager {
    private inputList;
    private inputsClass;
    private inputAddButton;
    private maxAdds;
    private buttonContainer;
    constructor(inputList: HTMLOListElement, inputsClass: string, addButton: HTMLButtonElement, maxAdds: number);
    private initialize;
    private setupEventListeners;
    private addNewInput;
    private handleBackspace;
    private addEnterHandlersToExisting;
    private addEnterHandler;
    private getInputs;
    private updateButtonVisibility;
}
declare const resumeOutput: HTMLElement;
declare const resume2Output: HTMLElement;
declare const resume3Output: HTMLElement;
declare const theme1: HTMLElement;
declare const theme2: HTMLElement;
declare const theme3: HTMLElement;
declare const switchTheme: (theme: string) => void;
declare function handleProfilePictureUpload(): void;
declare function updateResumeTemplates(): void;
type SectionType = "experience" | "skills";
declare const SELECTORS: {
    readonly buttons: ".hide-buttons";
    readonly formSection: (type: SectionType) => string;
    readonly resumeSection: (type: SectionType) => string;
    readonly educationDiv: "#Edu-div";
};
declare class SectionToggler {
    constructor();
    private initializeButtons;
    private handleToggle;
    private adjustEducationHeight;
    private updateButtonText;
    private capitalize;
    private isValidSection;
}
interface ResumeData {
    theme: string;
    profile: {
        name: string;
        email: string;
        contact: string;
        address: string;
        profileText: string;
        profileImage?: string;
    };
    education: string;
    experience: string;
    skills: string[];
    languages: string[];
}
declare function showError(message: string): void;
declare function readFileAsDataURL(file: File): Promise<string>;
