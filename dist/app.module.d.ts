import { ConfigurationService } from './shared/configuration/configuration/configuration.service';
export declare class AppModule {
    private readonly _configurationService;
    static host: string;
    static port: number | string;
    static isDev: boolean;
    constructor(_configurationService: ConfigurationService);
    private static normalizePort;
}
