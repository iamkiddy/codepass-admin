export default class APIUrls {
    static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    
    // login 
    static readonly login = `${APIUrls.BASE_URL}/api/v1/auth/login`;

    // event types
    static readonly getEventType = `${APIUrls.BASE_URL}/api/v1/util/event-types`;

    // create event type
    static readonly createEventType = `${APIUrls.BASE_URL}/api/v1/util/event-type`;

    // update event type
    static readonly updateEventType = `${APIUrls.BASE_URL}/api/v1/util/event-type`;

    // delete event type
    static readonly deleteEventType = `${APIUrls.BASE_URL}/api/v1/util/event-type`;

    // category
    static readonly getCategory = `${APIUrls.BASE_URL}/api/v1/util/categories`;

    // create category
    static readonly createCategory = `${APIUrls.BASE_URL}/api/v1/util/category`;

    // update category
    static readonly updateCategory = `${APIUrls.BASE_URL}/api/v1/util/category`;

    // delete category
    static readonly deleteCategory = `${APIUrls.BASE_URL}/api/v1/util/category`;

    // faq
    static readonly getFaq = `${APIUrls.BASE_URL}/api/v1/util/faqs`;

    // create faq
    static readonly createFaq = `${APIUrls.BASE_URL}/api/v1/util/faq`;

    // update faq
    static readonly updateFaq = `${APIUrls.BASE_URL}/api/v1/util/faq`;

    // delete faq
    static readonly deleteFaq = `${APIUrls.BASE_URL}/api/v1/util/faq`;

    // banner
    static readonly getBanner = `${APIUrls.BASE_URL}/api/v1/util/banners`;

    // create banner
    static readonly createBanner = `${APIUrls.BASE_URL}/api/v1/util/banner`;    

    // update banner
    static readonly updateBanner = `${APIUrls.BASE_URL}/api/v1/util/banner`;

    // delete banner
    static readonly deleteBanner = `${APIUrls.BASE_URL}/api/v1/util/banner`;

}
