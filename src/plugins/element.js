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
    Message,
    Badge,
    Switch
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
Vue.use(Badge);
Vue.use(Switch);
Vue.prototype.$message = Message;
Vue.use(Loading.directive);