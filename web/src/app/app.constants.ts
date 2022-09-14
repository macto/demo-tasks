export class AppConstants
{
    public static readonly LANGS = [
        { id: "es", label: "Español" },
        { id: "en", label: "English" }
    ];

    public static readonly Routing = {
        BASE_PRIVATE: "abo",
        EDIT_SUFFIX: "edit",
        Parts: {
            VIEW: "details",
            EDIT: "edit/:id"
        }
    }

    public static readonly Urls = {
        TASKS: "/tasks",
        PRIVATE_HOME: "/dashboard"
    }

    public static readonly APP_PAGES = [
        { key: "tasks", url: AppConstants.Urls.TASKS },
        { key: "dashboard", url : AppConstants.Routing.BASE_PRIVATE + AppConstants.Urls.PRIVATE_HOME}
    ];

    public static readonly StorageKeys = {
        USER: "abo:usr"
    };

    public static readonly DEFAULT_LANG = AppConstants.LANGS[0].id;
    public static readonly DEFAULT_MAIN_PAGE = AppConstants.APP_PAGES[0].url;
}
