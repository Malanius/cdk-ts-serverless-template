import type { BiomeOptions } from 'projen/lib/javascript';
import { IndentStyle, JsTrailingCommas, QuoteStyle, VcsClientKind } from 'projen/lib/javascript/biome/biome-config';

export const biomeOptions: BiomeOptions = {
  biomeConfig: {
    vcs: {
      enabled: true,
      clientKind: VcsClientKind.GIT,
      useIgnoreFile: true,
    },
    files: {
      ignoreUnknown: true,
    },
    formatter: {
      indentStyle: IndentStyle.SPACE,
    },
    assist: {
      actions: {
        source: {
          organizeImports: 'on',
        },
      },
    },
    linter: {
      rules: {
        recommended: true,
        style: {
          noParameterAssign: 'error',
          useAsConstAssertion: 'error',
          useDefaultParameterLast: 'error',
          useEnumInitializers: 'error',
          useSelfClosingElements: 'error',
          useSingleVarDeclarator: 'error',
          noUnusedTemplateLiteral: 'error',
          useNumberNamespace: 'error',
          noInferrableTypes: 'error',
          noUselessElse: 'error',
        },
      },
    },
    javascript: {
      formatter: {
        quoteStyle: QuoteStyle.SINGLE,
        trailingCommas: JsTrailingCommas.ES5,
        bracketSpacing: true,
        lineWidth: 120,
      },
    },
  },
};
