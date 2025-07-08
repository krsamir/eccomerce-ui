import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@ecom/ui'

ModuleRegistry.registerModules([AllCommunityModule])

function Location() {
  // Row Data: The data to be displayed.
  const [rowData] = useState([
    {
      name: 'Lalganj',
      city: 'Vaishali',
      state: 'Bihar',
      country: 'Bharat',
      created_At: '2025-07-04',
      updated_At: '2025-07-04',
    },
    {
      name: 'Dumri',
      city: 'Buxar',
      state: 'Bihar',
      country: 'Bharat',
      created_At: '2025-07-04',
      updated_At: '2025-07-04',
    },
  ])

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState([
    {
      field: 'action',
      minWidth: 100,
      maxWidth: 150,
      cellStyle: {alignContent:'center'},
      cellRenderer: () => (
        <div style={{ display: 'flex', gap: '30px', justifyItems: 'center'}}>
          <DeleteIcon style={{ cursor: 'pointer', color: 'red' }} />
          <EditIcon style={{ cursor: 'pointer', color: 'green' }} />
        </div>
      ),
    },
    { field: 'name' },
    { field: 'city' },
    { field: 'state' },
    { field: 'country' },
    { field: 'created_At' },
    { field: 'updated_At' },
  ])

  return (
    <div>
      <div style={{ margin: '20px 0 30px 10px' }}>
        <Button children="Create" />
      </div>
      <div style={{ width: '80vw', height: '80vh' }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  )
}

export default Location

// ag Grid
// tanstack
//
