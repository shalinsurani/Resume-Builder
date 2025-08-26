// CRACO override: remove CssMinimizerPlugin so production build completes
// This helps produce the unminified CSS so we can locate the parse error.
module.exports = {
	webpack: {
		configure: (webpackConfig) => {
			try {
				if (webpackConfig && webpackConfig.optimization && Array.isArray(webpackConfig.optimization.minimizer)) {
					webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter((m) => {
						const name = m && m.constructor && m.constructor.name;
						return name !== 'CssMinimizerPlugin' && name !== 'OptimizeCssAssetsWebpackPlugin';
					});
				}
			} catch (e) {
				// ignore — best-effort
			}
			return webpackConfig;
		}
	}
};
