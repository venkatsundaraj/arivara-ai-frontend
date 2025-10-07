export class XmlPrompt {
  parts: string[] = [];

  tag(
    name: string,
    content: string,
    attrs?: Record<string, number | string>
  ): this {
    const attrsValue = this.buildAttributes(attrs);
    this.parts.push(`<${name}${attrsValue}>${content}</${name}>`);

    return this;
  }
  open(name: string, attrs?: Record<string, number | string>): this {
    const attrsValue = this.buildAttributes(attrs);
    this.parts.push(`<${name}${attrsValue}>`);

    return this;
  }

  close(name: string): this {
    this.parts.push(`</${name}>`);

    return this;
  }

  text(content: string): this {
    this.parts.push(content);

    return this;
  }

  toString() {
    this.parts.join("\n");
  }

  private buildAttributes(attrs?: Record<string, string | number>): string {
    if (!attrs) return "";
    const res = Object.entries(attrs)
      .map(([k, v]) => `${k}=${v}`)
      .join("");
    return res;
  }
}
