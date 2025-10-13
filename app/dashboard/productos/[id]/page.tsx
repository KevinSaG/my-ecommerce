'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

import { getProductById, updateProduct } from '@/services/dashboard/products';
import type { Product } from '@/types';
import { toast } from 'sonner';

const CATEGORIES = [
  { value: 'rebar', label: 'Varillas' },
  { value: 'wire', label: 'Alambre' },
  { value: 'mesh', label: 'Malla' },
  { value: 'profiles', label: 'Perfiles' },
  { value: 'sheets', label: 'Planchas' },
  { value: 'tubes', label: 'Tubos' },
  { value: 'angles', label: 'Ángulos' },
  { value: 'channels', label: 'Canales' },
  { value: 'beams', label: 'Vigas' },
  { value: 'accessories', label: 'Accesorios' },
];

const STOCK_UNITS = [
  { value: 'unit', label: 'Unidad' },
  { value: 'kg', label: 'Kilogramo' },
  { value: 'ton', label: 'Tonelada' },
  { value: 'meter', label: 'Metro' },
];

const formSchema = z.object({
  sku: z.string().min(1, 'El SKU es requerido'),
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  category: z.string().min(1, 'La categoría es requerida'),
  diameter: z.number().min(0).nullable().optional(),
  length: z.number().min(0).nullable().optional(),
  width: z.number().min(0).nullable().optional(),
  thickness: z.number().min(0).nullable().optional(),
  weight_per_unit: z.number().min(0, 'El peso debe ser mayor a 0').optional(),
  grade: z.string().nullable().optional(),
  base_price: z.number().min(0, 'El precio debe ser mayor a 0').optional(),
  price_per_kg: z.number().min(0).nullable().optional(),
  currency: z.string().optional(),
  is_active: z.boolean().optional(),
  requires_quote: z.boolean().optional(),
  min_order_quantity: z.number().min(1).optional(),
  stock_unit: z.string().optional(),
  slug: z.string().optional(),
  meta_title: z.string().nullable().optional(),
  meta_description: z.string().nullable().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sku: '',
      name: '',
      description: '',
      category: '',
      diameter: null,
      length: null,
      width: null,
      thickness: null,
      weight_per_unit: 0,
      grade: '',
      base_price: 0,
      price_per_kg: null,
      currency: 'USD',
      is_active: true,
      requires_quote: false,
      min_order_quantity: 1,
      stock_unit: 'unit',
      slug: '',
      meta_title: '',
      meta_description: '',
    },
  });

  // Cargar producto
  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);

      const result = await getProductById(productId);

      if (result.success && result.data) {
        setProduct(result.data);
        
        // Llenar el formulario con los datos del producto
        form.reset({
          sku: result.data.sku || '',
          name: result.data.name || '',
          description: result.data.description || '',
          category: result.data.category || '',
          diameter: result.data.diameter || null,
          length: result.data.length || null,
          width: result.data.width || null,
          thickness: result.data.thickness || null,
          weight_per_unit: result.data.weight_per_unit || 0,
          grade: result.data.grade || '',
          base_price: result.data.base_price || 0,
          price_per_kg: result.data.price_per_kg || null,
          currency: result.data.currency || 'USD',
          is_active: result.data.is_active ?? true,
          requires_quote: result.data.requires_quote || false,
          min_order_quantity: result.data.min_order_quantity || 1,
          stock_unit: result.data.stock_unit || 'unit',
          slug: result.data.slug || '',
          meta_title: result.data.meta_title || '',
          meta_description: result.data.meta_description || '',
        });
      } else {
        toast.error(result.error || 'Error al cargar producto');
        router.push('/dashboard/productos');
      }

      setIsLoading(false);
    }

    if (productId) {
      loadProduct();
    }
  }, [productId, router, form]);

  // Guardar cambios
  const onSubmit = async (values: FormValues) => {
    setIsSaving(true);

    const result = await updateProduct(productId, values);

    if (result.success) {
      toast.success('Producto actualizado exitosamente');
      router.push('/dashboard/productos');
    } else {
      toast.error(result.error || 'Error al actualizar producto');
    }

    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-adelca-primary mx-auto mb-4" />
          <p className="text-slate-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/dashboard/productos')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">Editar Producto</h1>
          <p className="text-slate-600 mt-1">
            Modifica las características del producto
          </p>
        </div>
        {product && (
          <Badge variant={product.is_active ? 'default' : 'secondary'}>
            {product.is_active ? 'Activo' : 'Inactivo'}
          </Badge>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>
                Datos principales del producto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="ABC-001" {...field} />
                      </FormControl>
                      <FormDescription>Código único del producto</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Producto</FormLabel>
                    <FormControl>
                      <Input placeholder="Varilla Corrugada 12mm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descripción detallada del producto..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Especificaciones Técnicas */}
          <Card>
            <CardHeader>
              <CardTitle>Especificaciones Técnicas</CardTitle>
              <CardDescription>
                Características técnicas del producto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="diameter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diámetro (mm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="12.0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : null)
                          }
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormDescription>Para varillas y alambres</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitud (m)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="6.0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : null)
                          }
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ancho (mm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="100"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : null)
                          }
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thickness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Espesor (mm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="3.0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : null)
                          }
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight_per_unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso por Unidad (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="5.33"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grado del Acero</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="A36, A706, etc."
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Precios e Inventario */}
          <Card>
            <CardHeader>
              <CardTitle>Precios e Inventario</CardTitle>
              <CardDescription>
                Información de precios y gestión de stock
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="base_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Base (USD)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="15.99"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price_per_kg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio por Kg (USD)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="2.50"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : null)
                          }
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="min_order_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad Mínima de Pedido</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock_unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unidad de Stock</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona unidad" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {STOCK_UNITS.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Producto Activo</FormLabel>
                        <FormDescription>
                          El producto estará visible en el catálogo
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requires_quote"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Requiere Cotización</FormLabel>
                        <FormDescription>
                          El cliente debe solicitar cotización
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO y Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>SEO y Metadata</CardTitle>
              <CardDescription>
                Información para optimización en buscadores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (URL)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="varilla-corrugada-12mm"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormDescription>
                      Se usa en la URL del producto. Si se deja vacío, se generará automáticamente.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meta_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Título para SEO"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meta_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descripción breve para motores de búsqueda"
                        className="min-h-[80px]"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/productos')}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

