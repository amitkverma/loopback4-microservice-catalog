import {flags} from '@oclif/command';
import Base from '../command-base';
import {ExtensionOptions} from '../types';

export class Extension extends Base<ExtensionOptions> {
  static description = 'add an extension';

  static flags = {
    help: flags.boolean({
      name: 'help',
      description: 'show manual pages',
      type: 'boolean',
    }),
  };
  static args = [
    {name: 'name', description: 'name of the extension', required: false},
  ];

  async run() {
    await super.generate('extension', Extension);
  }
}
