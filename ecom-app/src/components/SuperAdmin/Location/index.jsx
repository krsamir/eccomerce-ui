import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@ecom/ui'
import { useLocationData } from '@hooks'
import FormDialog from './CreateLocationForm'
import { ConfirmationDialog } from '@ecom/ui'

ModuleRegistry.registerModules([AllCommunityModule])

const convertToLocationRowData = (data) => {
  return {
    Name: data.name,
    City: data.city,
    State: data.state,
    Country: data.country,
    'Created At': new Date(data.created_at).toLocaleString('en-in', {
      dateStyle: 'short',
      timeStyle: 'short',
    }),
    'Updated At': new Date(data.updated_at).toLocaleString('en-in', {
      dateStyle: 'short',
      timeStyle: 'short',
    }),
    id: data.id,
  }
}

function Location() {
  const { response, isSuccess, deleteLocation } = useLocationData()

  const [currentItem, setCurrentItem] = useState()
  const [rowData, setRowData] = useState([])
  const [open, setOpen] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [colDefs] = useState([
    {
      field: 'Action',
      minWidth: 100,
      maxWidth: 150,
      cellStyle: { alignContent: 'center' },
      cellRenderer: (params) => {
        return (
          <div style={{ display: 'flex', gap: '30px', justifyItems: 'center' }}>
            <DeleteIcon
              style={{ cursor: 'pointer', color: 'red' }}
              onClick={() => {
                setOpenConfirmation(true)
                setCurrentItem(params.data)
              }}
            />
            <EditIcon
              style={{ cursor: 'pointer', color: 'green' }}
              onClick={() => {
                setOpen(true)
                setCurrentItem(params.data)
              }}
            />
          </div>
        )
      },
    },
    { field: 'Name' },
    { field: 'City' },
    { field: 'State' },
    { field: 'Country' },
    { field: 'Created At' },
    { field: 'Updated At' },
    { field: 'id', hide: true },
  ])

  const handleDelete = () => {
    deleteLocation({ id: currentItem.id })
  }

  useEffect(() => {
    setRowData(
      response?.data?.data?.map((data) => convertToLocationRowData(data))
    )
  }, [response])

  return (
    <div>
      <div style={{ margin: '20px 0 30px 10px' }}>
        <Button
          children="Create"
          onClick={() => {
            setOpen(true)
          }}
        />
        <ConfirmationDialog
          open={openConfirmation}
          setOpen={setOpenConfirmation}
          title={'Delete'}
          context={'Do you want to delete the information?'}
          cancelLabel={'Cancel'}
          submitLabel={'Delete'}
          onSubmit={handleDelete}
        />
        <FormDialog open={open} setOpen={setOpen} />
      </div>
      <div style={{ width: '80vw', height: '80vh' }}>
        <AgGridReact
          loading={!isSuccess}
          rowData={rowData}
          columnDefs={colDefs}
        />
      </div>
    </div>
  )
}

export default Location
