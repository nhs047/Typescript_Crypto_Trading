export declare class ConfigurationService {
    static connectionString: string;
    private environmentHosting;
    get(name: string): string;
    readonly isDevelopment: boolean;
}
