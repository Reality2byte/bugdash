import { _ } from "util";
import * as BugList from "buglist";

/* eslint-disable camelcase */

export function init($container) {
    const days = 14;
    BugList.append({
        id: "recent-tasks",
        $container: $container,
        title: `Recent Tasks < ${days} Days`,
        description:
            `Tasks filed within the last ${days} days.\n` +
            "Bugs with the meta keyword or filed by WPT-sync are ignored.\n" +
            "Bugs are order by creation date, oldest first.\n" +
            "Timestamp shows bug creation.",
        query: {
            email1: "wptsync@mozilla.bugs",
            emailreporter1: "1",
            emailtype1: "notequals",
            resolution: "---",
            keywords_type: "nowords",
            keywords: "intermittent_failure",
            chfield: "[Bug creation]",
            chfieldfrom: `-${days}d`,
            f1: "bug_type",
            o1: "equals",
            v1: "task",
            f2: "keywords",
            o2: "notsubstring",
            v2: "meta",
        },
        usesComponents: true,
        augmentRow: ($row) => {
            const $keywords = _($row, ".keywords");
            if ($keywords.textContent === "") return;
            $keywords.innerHTML = $keywords.textContent
                .split(" ")
                .map((kw) => `<span class="keyword-${kw}">${kw}</span>`)
                .join(" ");
        },
    });
}
