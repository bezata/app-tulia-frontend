declare namespace IHeader {
    interface INavigation {
      slug?: string;
      title: string;
      additionalClasses?: string;
      target?: string;
      type?: 'link' | 'function';
      onClick?: () => void;
    }
}

export default IHeader;
