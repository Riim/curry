import placeholder from './placeholder';

export default function mergeArguments(args, moreArgs) {
	let i = 0;
	let j = 0;
	let len = args.length;
	let moreLen = moreArgs.length;

	let mergedArgs = Array(len);
	let placeholderCount = 0;

	for (; i < len; i++) {
		let arg = args[i];

		if (arg === placeholder) {
			if (j < moreLen && moreArgs[j++] !== placeholder) {
				mergedArgs[i] = moreArgs[j - 1];
				continue;
			} else {
				placeholderCount++;
			}
		}

		mergedArgs[i] = arg;
	}

	for (; j < moreLen; j++) {
		if ((mergedArgs[i++] = moreArgs[j]) === placeholder) {
			placeholderCount++;
		}
	}

	return { arguments: mergedArgs, placeholderCount };
}
