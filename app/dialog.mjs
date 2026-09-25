import { _ } from "util";

const g = {
    resolve: undefined,
};

function show(mode, message, closedBy) {
    const $dialog = _("#dialog");
    $dialog.classList.remove("dialog-alert", "dialog-prompt", "dialog-spinner");
    $dialog.classList.add(`dialog-${mode}`);
    $dialog.closedBy = closedBy;
    $dialog.returnValue = "";
    _("#dialog-message").textContent = message;
    $dialog.showModal();
}

export function alert(message) {
    if (_("#dialog").open) {
        return Promise.resolve(false);
    }

    return new Promise((resolve) => {
        g.resolve = resolve;
        show("alert", message, "closerequest");
    });
}

export function prompt(message, value, placeholder) {
    if (_("#dialog").open) {
        return Promise.resolve(false);
    }

    return new Promise((resolve) => {
        g.resolve = resolve;
        const $input = _("#dialog-input");
        $input.placeholder = placeholder ?? "";
        $input.value = value ?? "";
        show("prompt", message, "closerequest");
        if (value !== undefined) {
            $input.select();
        }
    });
}

export function showSpinner(message) {
    if (_("#dialog").open) return;

    show("spinner", message, "none");
}

export function hideSpinner() {
    const $dialog = _("#dialog");
    if ($dialog.classList.contains("dialog-spinner")) {
        $dialog.close();
    }
}

export function initUI() {
    const $dialog = _("#dialog");

    $dialog.addEventListener("close", () => {
        const resolve = g.resolve;
        g.resolve = undefined;
        if (!resolve) return;

        if ($dialog.returnValue !== "ok") {
            resolve(false);
        } else if ($dialog.classList.contains("dialog-prompt")) {
            resolve(_("#dialog-input").value);
        } else {
            resolve(true);
        }
    });

    _("#dialog-cancel").addEventListener("click", () => $dialog.close());
}
