type ItemId = number | string;

interface Item {
  id: ItemId,
  parent: ItemId,
  children?: Item[]
}

class TreeStore {
  items: Map<ItemId, Item> = new Map();

  constructor(items: Item[]) {
    items.forEach(item => {
      item.children = items.filter(_item => _item.parent === item.id);

      this.items.set(item.id, item);
    })
  }

  getAll(): Item[] {
    return Array.from(this.items.values());
  }

  getItem(id: ItemId): Item | null {
    return this.items.get(id) || null;
  }

  getChildren(id: ItemId): Item[] {
    const item = this.getItem(id);

    return item ? item.children! : [];
  }

  getAllChildren(id: ItemId): Item[] {
    const children = this.getChildren(id);

    return children.concat(...children.map(child => this.getAllChildren(child.id)));
  }

  getAllParents(id: ItemId): Item[] {
    const item = this.getItem(id);

    if (!item) return [];

    const parent = this.getItem(item.parent);

    return parent ? [parent].concat(this.getAllParents(parent.id)) : [];
  }
}

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);