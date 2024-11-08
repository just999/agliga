declare module '@tanstack/[adapter]-table' {
  interface FilterFns {
    myCustomFilter: FilterFn<unknown>;
  }
}

const column = columnHelper.data('key', {
  filterFn: 'myCustomFilter',
});

const table = useReactTable({
  columns: [column],
  filterFns: {
    myCustomFilter: (rows, columnIds, filterValue) => {
      // return the filtered rows
    },
  },
});
