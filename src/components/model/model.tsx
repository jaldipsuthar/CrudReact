import { Box, Modal } from '@mui/joy'
import React from 'react'

function ModelComponent({closeModal ,isModalOpen ,ModalContent}:any) {
  return (
    <div>
             <Modal open={isModalOpen} onClose={closeModal}>
            <Box>
              <ModalContent />
            </Box>
          </Modal>
    </div>
  )
}

export default ModelComponent
