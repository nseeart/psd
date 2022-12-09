import LayerComps from "./resources/layer_comps";
import LayerLinks from "./resources/layer_links";
import PathSelectionState from "./resources/path_selection_state";
import { tap } from "lodash-es";

const RESOURCES = [LayerComps, LayerLinks, PathSelectionState];

export default class ResourceSection {
    static factory(resource) {
        const len = RESOURCES.length;
        for (let i = 0; i < len; i++) {
            const Section = RESOURCES[i];
            const section = new Section(resource);
            if (section.id !== resource.id) {
                continue;
            }
            return tap(section, (s) => {
                return s.parse();
            });
        }
        return null;
    }
}
