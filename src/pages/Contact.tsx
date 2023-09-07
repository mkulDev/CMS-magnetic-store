import React, { useRef, useState } from 'react'
import storeImage from '../assets/store.jpg'
import { TbWorldLatitude, TbBrandBing } from 'react-icons/tb'
import { MdOutlineEmail } from 'react-icons/md'
import { HiMiniDevicePhoneMobile } from 'react-icons/hi2'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import emailjs from '@emailjs/browser'

interface FormData {
  name: string
  email: string
  message: string
  reclamation: boolean
  product: string
}

const initialState = { name: '', email: '', message: '', reclamation: false, product: '' }
const Contact: React.FC = () => {
  const [validationErrors, setValidationErrors] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(initialState)
  const form = useRef<HTMLFormElement>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (formData) {
        emailjs.sendForm(import.meta.env.VITE_REACT_APP_SERVICE, import.meta.env.VITE_REACT_APP_TEMPLATE, form.current as HTMLFormElement, import.meta.env.VITE_REACT_APP_PUBLIC).then(
          function (response) {
            console.log('SUCCESS!', response.status, response.text)
            setFormData(initialState)
          },
          function (error) {
            console.log('FAILED...', error)
          }
        )
      }
    } catch (error) {
      setValidationErrors((error as Error).message)
    }
  }
  const toggleReclamation = () => {
    setFormData({ ...formData, reclamation: !formData.reclamation })
  }
  const isFormDisabled = Boolean(!(formData.email && formData.message && formData.name))

  return (
    <div className="h-full flex flex-col w-full lg:gap-12 lg:flex-row lg:flex-wrap justify-center items-center lg:items-end font-bold mt-8 animate-fade'">
      <div className='flex flex-col  mb-8 items-start xl:w-1/3 '>
        <div className='mb-4 text-xs md:text-sm '>
          <h2 className='text-3xl md:text-4xl  font-bold my-2 md:my-6'>
            <span className='text-blue-500 mr-2'>Magnetic</span>Store
          </h2>

          <p className='flex items-center gap-1 '>
            <TbBrandBing size={20} /> <span>Magnetic Store Sp.z o.o.</span>
          </p>

          <p className='flex items-center gap-1'>
            <HiMiniDevicePhoneMobile size={20} />
            <span>+48 123 456 789</span>
          </p>
          <p className='flex items-center gap-1'>
            <TbWorldLatitude size={20} /> <span>magneticstore.com.pl</span>
          </p>
          <p className='flex items-center gap-1'>
            <HiOutlineLocationMarker size={20} />
            <span>ul. Grunwaldzka 12, 35-152 Wrocław</span>
          </p>
          <p className='flex items-center gap-1'>
            <MdOutlineEmail size={20} /> <span>contact@magneticstore.com</span>
          </p>
        </div>
        <div className='mb-4 text-xs md:text-sm '>
          <h2 className='text-lg font-semibold mb-1'>Business Hours</h2>
          <p className=''>
            Monday-Friday:<span className='text-blue-500  ml-1 '>9:00 AM - 6:00 PM</span>
          </p>
          <p>
            Saturday-Sunday: <span className='text-blue-500 ml-1 '>Closed</span>
          </p>
        </div>
        <img
          src={storeImage}
          className='w-[350px] md:w-[500px] xl:w-full h-[auto] rounded-xl animate-fade mt-4 shadow-md'
        />
      </div>
      <div className='flex flex-col w-[90vw] md:w-auto xl:w-1/3 animate-fade'>
        <h2 className='text-2xl md:text-3xl  font-bold mt-2 '>
          <span className='text-blue-500 mr-2'>Contact</span>form
        </h2>
        <p className='text-sm mb-2'>If you have any questions, please don't hesitate to write to us.</p>

        <form
          ref={form as React.LegacyRef<HTMLFormElement>}
          onSubmit={handleSubmit}
          className=' py-8 px-6 text-xs md:text-sm flex flex-col mb-8 rounded-xl w-[90vw] md:w-[500px] lg:w-full bg-gray-100 shadow-lg border-t-2 '
        >
          <label
            htmlFor='name'
            className='pl-2'
          >
            Full Name:
          </label>
          <input
            onChange={handleInputChange}
            type='text'
            placeholder='Full Name'
            name='name'
            value={formData.name}
            className='px-6 py-2 mb-2 rounded-md bg-gray-200 focus:outline-none'
          />

          <label
            htmlFor='category'
            className='pl-2'
          >
            E-mail:
          </label>
          <input
            onChange={handleInputChange}
            type='text'
            placeholder='E-mail'
            name='email'
            value={formData.email}
            className='px-6 py-2 mb-2 rounded-md bg-gray-200 focus:outline-none'
          />

          <label
            htmlFor='description'
            className='pl-2'
          >
            How Can We Assist You?:
          </label>
          <textarea
            rows={10}
            onChange={handleInputChange}
            placeholder='Please Describe Your Issue'
            name='message'
            value={formData.message}
            className='px-6 py-2 mb-2 rounded-md bg-gray-200 focus:outline-none'
          />

          <div className='flex items-center justify-between mt-2'>
            <div className='flex items-center'>
              <label
                htmlFor='sale'
                className='p-2'
              >
                Complaint:
              </label>
              <div className={`relative ${formData.reclamation ? 'bg-blue-200' : 'bg-gray-200'} w-[30px] h-[15px] rounded-xl border-2 flec items-center`}>
                <button
                  type='button'
                  name='sale'
                  value={formData.reclamation ? 'true' : 'false'}
                  onClick={toggleReclamation}
                  className={`w-[15px] h-[15px] rounded-full transistion-all  absolute top-[-2px] ${formData.reclamation ? 'bg-blue-500 right-0' : 'bg-gray-400 left-0'} duration-500 cursor-pointer`}
                />
              </div>
            </div>

            <input
              onChange={handleInputChange}
              type='text'
              placeholder='Product info'
              name='product'
              value={formData.reclamation ? formData.product : ''}
              disabled={!formData.reclamation}
              className='px-6 py-2 mb-2 rounded-md bg-gray-200 focus:outline-none w-[60%]'
            />
          </div>
          {/* submit button*/}
          <button
            type='submit'
            disabled={isFormDisabled}
            className={`px-6 py-2 mt-4 ${isFormDisabled ? 'bg-gray-400' : 'bg-blue-500'} rounded-lg text-white hover:opacity-60 duration-500 w-[150px] self-center`}
          >
            Send
          </button>
          {validationErrors && <p className='text-red-500'>{validationErrors}</p>}
        </form>
      </div>
    </div>
  )
}

export default Contact
