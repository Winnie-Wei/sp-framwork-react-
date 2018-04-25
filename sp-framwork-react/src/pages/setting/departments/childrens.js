import React from 'react'


export default function childrens (childComponent) {

    return (WrappedComponent) => {
        class children extends React.Component {
            constructor (props) {
              super(props);
              this.state = {
                nodes: null
              };
            }
            
            renderNodes = (data) => {
              return data.map((item) => {
                let ChildComponent = childComponent(item)
                if (item.children) {
                  return (
                    <ChildComponent
                      key={item.id}
                      title={item.name}
                    >
                      {this.renderNodes(item.children)}
                    </ChildComponent>
                  );
                }
                return <ChildComponent key={item.id}>{item.name}</ChildComponent>;
              });
            }

            render () {
              const { nodes } = this.state;

              if (!nodes || !nodes.length) {
                return <div>Loading...</div>
              }

              return (
                <WrappedComponent
                  {...this.props}
                  renderNodes={this.renderNodes}
                />
              );
            }
        }
        return children;
    }
}