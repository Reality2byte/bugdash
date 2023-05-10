import * as BugList from "buglist";
import * as Tracked from "buglists/tracked";
import * as Blockers from "buglists/blockers";
import * as Criticals from "buglists/criticals";
import * as TopCrashers from "buglists/topcrashers";
import * as Regressions from "buglists/regressions";
import { _ } from "util";

export function initUI() {
    const $content = _("#important-content");

    let $group = BugList.newGroup($content);
    Blockers.init($group, true);
    Criticals.init($group, true);
    TopCrashers.init($group, true);

    $group = BugList.newGroup($content);
    Tracked.init($group, true);

    $group = BugList.newGroup($content);
    Regressions.init($group, true);
}
