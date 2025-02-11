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
declare function populateResumeData(container: HTMLElement, data: ResumeData): void;
