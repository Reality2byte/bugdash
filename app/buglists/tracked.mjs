import * as BugList from "buglist";
import * as Releases from "releases";

export function init($container) {
    const componentsType = $container.closest(".content").dataset.components;
    for (const chan of Releases.channels()) {
        BugList.append({
            id: `tracked-${chan.name}-${componentsType}`,
            $container: $container,
            title: `${chan.version} (${chan.title}) Tracked Bugs`,
            description:
                `Bugs with tracking-firefox${chan.version} set to +\n` +
                "Bugs are order by creation date, oldest first.",
            query: {
                classification: [
                    "Client Software",
                    "Components",
                    "Developer Infrastructure",
                    "Other",
                    "Server Software",
                ],
                resolution: "---",
                f1: `cf_tracking_firefox${chan.version}`,
                o1: "equals",
                v1: "+",
            },
        });
    }
}
