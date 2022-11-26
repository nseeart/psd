import LayerComps from "./resources/layer_comps";
import LayerLinks from "./resources/layer_links";

const _ = require("lodash");
const RESOURCES = [LayerComps, LayerLinks];

export default class ResourceSection {
    static factory(resource) {
        for (let _i = 0, _len = RESOURCES.length; _i < _len; _i++) {
            const Section = RESOURCES[_i];
            if (Section.prototype.id !== resource.id) {
                continue;
            }
            return _.tap(new Section(resource), (s) => {
                return s.parse();
            });
        }
        return null;
    }
}
