/** @jsx h */
import { h } from "../jsx.ts";
import { Component } from "../component.ts";
import { Counter } from "./Counter.tsx";

export class CounterToggle extends Component {
  override state = { mounted: true, count: 1 };

  private increment = () => {
    console.log("increment");
    this.setState({ count: this.state.count + 1 });
  };

  private toggle = () => {
    this.setState({ mounted: !this.state.mounted });
  };

  render() {
    return (
      <div>
        <div class="counter-holder">
          <span>Mount: {String(this.state.mounted)}</span>
          {this.state.mounted ? <Counter count={this.state.count} increment={this.increment} /> : null}
        </div>
        <button onClick={this.toggle}>Toggle Counter</button>
      </div>
    );
  }
}
