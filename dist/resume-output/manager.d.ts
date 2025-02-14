declare function initializeManagers(): void;
declare class DownloadManager {
    private modal;
    constructor();
    private createDownloadModal;
    private setupDownloadListeners;
    private showModal;
    private closeModal;
    private generateHighQualityPdf;
    private generatePng;
    private generatePreview;
}
declare class ShareManager {
    private readonly modal;
    private readonly userName;
    constructor();
    private extractUserName;
    private getStoredUserName;
    private createShareModal;
    private setupShareListeners;
    private showModal;
    private closeModal;
    private generateUniqueResumeLink;
    private getUserId;
    private shareOnPlatform;
    private isValidPlatform;
}
declare class EditManager {
    private isEditing;
    private readonly editableElements;
    constructor();
    private toggleNavbarFooterVisibility;
    private setupEditListeners;
    private initializeEditableElements;
    private toggleEditMode;
    private toggleContentEditable;
    private updateEditButton;
    private saveChanges;
    private loadProfile;
}
