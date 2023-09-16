import {
    NavigationGuardNext,
    RouteLocationNormalized,
    RouteLocationRaw,
    Router
} from "vue-router";

const records: { [k: string]: string } = {};
let router: Router;

/**
 * install history plugin
 * @param r router instance
 */
export function installHistory(r: Router): void {
    router = r;

    r.beforeEach(
        (
            _: RouteLocationNormalized,
            from: RouteLocationNormalized,
            next: NavigationGuardNext
        ) => {
            if (from.meta && from.meta.history) {
                records[`${from.meta.history}`] = from.fullPath;
            }
            next();
        }
    );
}

/**
 * handle in component route change
 * this method must call from onBeforeRouteUpdate hook in route
 *
 * @param name history name
 * @param to to route
 */
export function handleParamsChange(
    name: string,
    to: RouteLocationNormalized
): void {
    if (to.meta && to.meta.history && to.meta.history === name) {
        records[name] = to.fullPath;
    }
}

/**
 * redirect to history or fallback if no history exists.
 * @param name route name
 * @param fallback fallback address if route history not found
 */
export function pushHistory(name: string, fallback: RouteLocationRaw): void {
    if (records[name]) {
        router.push(records[name]);
    } else {
        router.push(fallback);
    }
}

/**
 * redirect to history or fallback if no history exists.
 * @param name route name
 * @param fallback fallback address if route history not found
 */
export function replaceHistory(name: string, fallback: RouteLocationRaw): void {
    if (records[name]) {
        router.replace(records[name]);
    } else {
        router.replace(fallback);
    }
}
