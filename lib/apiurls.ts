export default class APIUrls {
    static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    
    // login 
    static readonly login = `${APIUrls.BASE_URL}/api/v1/auth/login`;

    // forgot password
    static readonly forgotPassword = `${APIUrls.BASE_URL}/api/v1/auth/forgot-password`;

    // event types
    static readonly getEventType = `${APIUrls.BASE_URL}/api/v1/util/event-types`;

    // create event type
    static readonly createEventType = `${APIUrls.BASE_URL}/api/v1/util/event-type`;

    // update event type
    static readonly updateEventType = `${APIUrls.BASE_URL}/api/v1/util/event-type`;

    // delete event type
    static readonly deleteEventType = `${APIUrls.BASE_URL}/api/v1/util/event-type`;

    // category
    static readonly getCategories = `${APIUrls.BASE_URL}/api/v1/util/categories`;

    // get category by id
    static readonly getCategory = `${APIUrls.BASE_URL}/api/v1/util/category`;

    // create category
    static readonly createCategory = `${APIUrls.BASE_URL}/api/v1/util/category`;

    // update category
    static readonly updateCategory = `${APIUrls.BASE_URL}/api/v1/util/category`;

    // delete category
    static readonly deleteCategory = `${APIUrls.BASE_URL}/api/v1/util/category`;

    // faq
    static readonly getFaq = `${APIUrls.BASE_URL}/api/v1/util/faqs`;

    // get faq by id
    static readonly getFaqById = `${APIUrls.BASE_URL}/api/v1/util/faq`;

    // create faq
    static readonly createFaq = `${APIUrls.BASE_URL}/api/v1/util/faq`;

    // update faq
    static readonly updateFaq = `${APIUrls.BASE_URL}/api/v1/util/faq`;

    // delete faq
    static readonly deleteFaq = `${APIUrls.BASE_URL}/api/v1/util/faq`;

    // banner
    static readonly getBanner = `${APIUrls.BASE_URL}/api/v1/util/banners`;

    // get banner by id
    static readonly getBannerById = `${APIUrls.BASE_URL}/api/v1/util/banner`;

    // create banner
    static readonly createBanner = `${APIUrls.BASE_URL}/api/v1/util/banner`;    

    // update banner
    static readonly updateBanner = `${APIUrls.BASE_URL}/api/v1/util/banner`;

    // delete banner
    static readonly deleteBanner = `${APIUrls.BASE_URL}/api/v1/util/banner`;

    // user
    static readonly getUser = `${APIUrls.BASE_URL}/api/v1/users`;

    // create user  
    static readonly createUser = `${APIUrls.BASE_URL}/api/v1/users/create`;

    // update user
    static readonly updateUser = `${APIUrls.BASE_URL}/api/v1/users/update`;

    // delete user
    static readonly deleteUser = `${APIUrls.BASE_URL}/api/v1/users/delete`;

    // blogs
    static readonly getBlogs = `${APIUrls.BASE_URL}/api/v1/blog`;

    // get blog by id
    static readonly getBlogById = `${APIUrls.BASE_URL}/api/v1/blog`;

    // create blog
    static readonly createBlog = `${APIUrls.BASE_URL}/api/v1/blog/create`;

    // update blog
    static readonly updateBlog = `${APIUrls.BASE_URL}/api/v1/blog`;

    // delete blog
    static readonly deleteBlog = `${APIUrls.BASE_URL}/api/v1/blog`;

    // get event utils
    static readonly getEventUtils = `${APIUrls.BASE_URL}/api/v1/util/events`;
}
