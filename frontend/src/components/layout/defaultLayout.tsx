import type { IJsonModel } from 'flexlayout-react'

const defaultModel: IJsonModel = {
  global: {
    
    tabDragSpeed : 0.3,
    tabEnableClose: false,       // no close button on tabs
    tabEnableRename: false,      // disable rename
    tabEnableDrag: true,  
    tabSetEnableDrop : true,       // tabs can be dragged
    tabSetEnableClose: false,    // disable close on tabsets
    tabSetEnableMaximize: true, // disable maximize button
    tabSetEnableTabStrip: true, // hide the tab strip
    splitterSize: 6,             // width of splitters
    rootOrientationVertical: true // top-level column (vertical stack)
  },
  borders: [],

  layout: {
    type: "column", // main vertical stack
    children: [
      {
        type: "row", // top row with horizontal panels
        weight: 3,
        children: [
          {
            type: "tabset",
            weight: 1,
            selected: 0,
            children: [
              { type: "tab", name: "Problem", component: "problem" }
            ]
          },
          {
            type: "tabset",
            weight: 2,
            selected: 0,
            children: [
              { type: "tab", name: "Editor", component: "editor" }
            ]
          },
          {
            type: "tabset",
            weight: 1,
            selected: 0,
            children: [
              { type: "tab", name: "Assistant", component: "assistant" }
            ]
          }
        ]
      },
      {
        type: "tabset", // bottom row Output panel
        weight: 2,
        selected: 0,
        children: [
          { type: "tab", name: "Output", component: "output" }
        ]
      }
    ]
  }
};

export default defaultModel;
