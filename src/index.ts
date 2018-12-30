import * as rollup from "rollup";
import * as faqtor from "faqtor";

export const roll = (options: rollup.RollupOptions): faqtor.IFactor => {
    const run = async (): Promise<Error> => {
        try {
            let err: Error = null;
            const bundle = await rollup.rollup(options).catch((e) => { err = Error(e) });
            if (err) { return err; }
            if (!bundle) return;
            await bundle.write(options.output);
        } catch (e) {
            return Error(e);
        }
        return null;
    }

    return faqtor.func(run);
}