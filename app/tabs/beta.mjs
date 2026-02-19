import * as BugList from "buglist";
import * as Beta from "buglists/beta";
import { _ } from "util";

export function initUI() {
    const $content = _("#beta-content");

    const $group = BugList.newGroup($content);
    Beta.init($group, false);
}
