export { InfiniteAutocomplete, InputComponent, OptionsComponent };

///////////////////////////////////////////////////////////////////////////////
// infAutocomplete module (infinite-autocomplete)
///////////////////////////////////////////////////////////////////////////////

/**
 * InfiniteAutocomplete interface
 * @author Islam Attrash
 */
declare class InfiniteAutocomplete {
  /**
   * constructor for InfiniteAutocomplete class
   * Enabling pluggable system linked with Interfaces only
   * @param element - HTMLElement to append the infinite-autocomplete in it
   * @param config - InfiniteAutocomplete config options
   * @param optionComponent - Option component implementation to be injected (or default)
   * @param inputComponent - Input component implementation to be injected (or default)
   * @param optionsComponent - Options component implementation to be injected (or default)
   */
  constructor(element: HTMLElement, config?: InfiniteAutocompleteConfig);
  /**
   * Update configuration on runtime
   * @param config - New infinite autocomplete configuration
   */
  public setConfig(config: InfiniteAutocompleteConfig);
  /**
   * Destory the plugin and unbind all the DOM events
   */
  public destroy();
}

/**
 * Input component constructor interface
 * @author Islam Attrash
 */
interface IInputCompoenentConstructor {
  new(): IInputComponent;
}

/**
 * Input component interface
 * @author Islam Attrash
 */
interface IInputComponent {
  /**
   * Input component template string
   * @default `<input />`
   */
  render(): string;
  /**
   * onInputChange event handler
   * @param inputElement - HTMLInputElement
   * @param value - input text value
   */
  onInputChange?(inputElement: HTMLInputElement, value: string);
}

/**
 * Default input component implementation
 */
declare class InputComponent implements IInputComponent {
  public render(): string;
}

/**
 * Options component constructor interface
 * @author Islam Attrash
 */
interface IOptionsComponentConstructor {
  new(): IOptionsComponent;
}


/**
 * infinite-autocomplete config interface
 * @author Islam Attrash
 */
interface InfiniteAutocompleteConfig {
  /**
   * current value
   */
  value?: string;
  /**
   * data static source
   */
  data?: IOption[];
  /**
   * max height for the options
   */
  maxHeight?: string;
  /**
   * Chunk fetch size
   */
  fetchSize?: number;
  /**
   * Customized input class to override the default input
   */
  customizedInput?: IInputCompoenentConstructor;
  /**
   * Customized options class to override the default input
   */
  customizedOptions?: IOptionsComponentConstructor;
  /**
   * on-loading-state-change event output handler when choosing an option
   */
  onLoadingStateChange?(loadingState: boolean);
  /**
   * on-select event output handler when choosing an option
   */
  onSelect?(selectedElement: EventTarget, selectedData: IOption);
  /**
   * on-error event output handler when exception thrown
   */
  onError?(error: Error);
  /**
   * data dynamic api source
   */
  getDataFromApi?(text: string, page: number, fetchSize: number): Promise<any[]>;
}

interface IInputComponent {
  /**
   * Input component template string
   * @default `<input />`
   */
  render(): string;
  /**
   * onInputChange event handler
   * @param inputElement - HTMLInputElement
   * @param value - input text value
   */
  onInputChange?(inputElement: HTMLInputElement, value: string);
}

/**
 * Option model interface
 * @author Islam Attrash
 */
interface IOption {
  /**
   * Text for the option
   */
  text: string;
  /**
   * The option value
   */
  value: any;
  /**
   * Any other OPTIONAL dynamic user properties
   */
  [key: string]: any;
}

/**
 * Options component interface
 * @author Islam Attrash
 */
interface IOptionsComponent {
  /**
   * The list element tag selector
   * This value can be a tag string `ul` `div` `ol` that indicates tag name,
   * or it can be a class selector (or id selector) `.myClass`/`#myId` which is
   * returned in @render method template
   * @default `ul`
   */
  listElementSelector: string;
  /**
   * Options component template string
   * @default `<ul></ul>` base list tag
   */
  render(): string;
  /**
   * Option row template string in Options component
   * @param option
   * @default `<li> ${value} </li>`
   * @requires one base HTML Element
   */
  renderOption(option: IOption): string;
}

/**
 * Default options component
 */
declare class OptionsComponent implements IOptionsComponent {
  public listElementSelector: string;
  public render(): string;
  public renderOption(option: IOption): string;
}
