/*
    Test mixin (Phase 1 - Installtion)
    
    The goals are: (PENDING)
    - To test the accessibility of the Mantra object
    - To test the modifiability of a Store module that's inside the Mantra object

    Output:
    - Print the general's schema from the Store
    - Modify a property from the Store
*/
import { MantraPlugin } from '../MantraPlugin';


const mixin = {
    mounted() {
        console.log("TEST MIXIN WORKING!");
        console.log("MANTRA PLUGIN", MantraPlugin.getConfig());
    }
};

export default mixin;