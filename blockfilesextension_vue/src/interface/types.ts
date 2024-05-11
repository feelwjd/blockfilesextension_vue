export interface Extension {
    extensionIndex: number;
    extensionName: string;
    selectCount: number;
    createDate: string;
    updateDate: string;
}

export interface ExtensionHistory {
    historyIndex: string;
    sessionId: string;
    extensionIndex: string;
    extensionName: string;
    checked: string;
    createDate: string;
    updateDate: string;
}

export interface UserSession {
    sessionId: string;
    createDate: string;
    expiredDate: string;
}
