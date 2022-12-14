export default {
    isFolder() {
        if (this.adjustments["sectionDivider"] != null) {
            return this.adjustments["sectionDivider"].isFolder;
        } else if (this.adjustments["nestedSectionDivider"] != null) {
            return this.adjustments["nestedSectionDivider"].isFolder;
        } else {
            return this.name === "<Layer group>";
        }
    },
    isFolderEnd() {
        if (this.adjustments["sectionDivider"] != null) {
            return this.adjustments["sectionDivider"].isHidden;
        } else if (this.adjustments["nestedSectionDivider"] != null) {
            return this.adjustments["nestedSectionDivider"].isHidden;
        } else {
            return this.name === "</Layer group>";
        }
    },
};
