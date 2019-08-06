import Vue from 'vue'
import { 
    Button, 
    Input, 
    Avatar, 
    Carousel, 
    CarouselItem, 
    Form, 
    FormItem, 
    RadioGroup, 
    Radio, 
    Upload, 
    Loading,
    Message
} from 'element-ui'

Vue.use(Button);
Vue.use(Input);
Vue.use(Avatar);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Upload);
Vue.prototype.$message = Message;
Vue.use(Loading.directive);