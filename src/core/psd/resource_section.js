import LayerComps from "./resources/layer_comps";
import LayerLinks from "./resources/layer_links";

const _ = require("lodash");
const RESOURCES = [LayerComps, LayerLinks];

export default class ResourceSection {
    static factory(resource) {
        const _len = RESOURCES.length;
        for (let _i = 0; _i < _len; _i++) {
            const Section = RESOURCES[_i];
            if (Section.prototype.id !== resource.id) {
                continue;
            }
            console.log("ddddd");
            return _.tap(new Section(resource), (s) => {
                return s.parse();
            });
        }
        return null;
    }
}
